export const prerender = false;

import nodemailer from "nodemailer";

function safeString(v: FormDataEntryValue | null): string {
  if (v == null) return "";
  return typeof v === "string" ? v.trim() : "";
}

function fileExt(filename: string): string {
  const idx = filename.lastIndexOf(".");
  return idx >= 0 ? filename.slice(idx + 1).toLowerCase() : "";
}

function getRedirectTarget(request: Request, fallbackPath: string) {
  const ref = request.headers.get("referer");
  if (!ref) return fallbackPath;
  try {
    const url = new URL(ref);
    return url.pathname + url.search;
  } catch {
    return fallbackPath;
  }
}

export async function POST({ request }: { request: Request }) {
  const formData = await request.formData();

  const type = safeString(formData.get("type")) || "Заявка";
  const context = safeString(formData.get("context"));
  const page = safeString(formData.get("page"));
  const variant = safeString(formData.get("variant"));

  const name = safeString(formData.get("name"));
  const company = safeString(formData.get("company"));
  const role = safeString(formData.get("role"));
  const phone = safeString(formData.get("phone"));
  const email = safeString(formData.get("email"));
  const city = safeString(formData.get("city"));
  let message = safeString(formData.get("message"));

  const redirectBack = getRedirectTarget(request, "/zayavka/?error=1");

  const isAjax = request.headers.get("X-Requested-With") === "XMLHttpRequest";

  if (!phone && !email) {
    if (isAjax) {
      return new Response(JSON.stringify({ success: false, error: "Укажите телефон или email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const url = new URL(redirectBack, request.url);
    url.searchParams.set("error", "1");
    return Response.redirect(url.toString(), 303);
  }

  if (!message) {
    message = "Просьба связаться. Детали уточнить по телефону/почте.";
  }

  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const SMTP_FROM = process.env.SMTP_FROM || process.env.SMTP_USER || "no-reply@localhost";
  const LEADS_TO_EMAIL = process.env.LEADS_TO_EMAIL || process.env.SMTP_TO || process.env.SMTP_USER;

  const who = [company, name].filter(Boolean).join(" — ") || "Без имени";
  const subject = `[${type}] ${who}`;
  const text =
    [
      `Тип: ${type}`,
      variant ? `Форма: ${variant}` : null,
      context ? `Контекст: ${context}` : null,
      page ? `Страница: ${page}` : null,
      "",
      `Контакт: ${name || "—"}`,
      company ? `Компания: ${company}` : null,
      role ? `Роль: ${role}` : null,
      phone ? `Телефон: ${phone}` : null,
      email ? `Email: ${email}` : null,
      city ? `Город/регион: ${city}` : null,
      "",
      "Сообщение:",
      message
    ]
      .filter(Boolean)
      .join("\n");

  const attachments: Array<{ filename: string; content: Buffer }> = [];
  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    const maxBytes = 10 * 1024 * 1024;
    if (file.size <= maxBytes) {
      const ext = fileExt(file.name);
      const allowed = new Set(["pdf", "dwg", "dxf", "png", "jpg", "jpeg", "webp"]);
      if (allowed.has(ext)) {
        const buf = Buffer.from(await file.arrayBuffer());
        attachments.push({ filename: file.name, content: buf });
      }
    }
  }

  const canSend =
    SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && LEADS_TO_EMAIL;

  if (canSend) {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: SMTP_FROM,
      to: LEADS_TO_EMAIL,
      subject,
      text,
      attachments: attachments.length ? attachments : undefined
    });

    if (isAjax) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    const redirectUrl = (redirectBack.split('#')[0] || '/') + '#thankyou';
    return Response.redirect(redirectUrl, 303);
  }

  // Dev fallback: accept the lead but don't send email.
  console.warn("[lead] SMTP is not configured. Lead accepted in mock mode.");
  if (isAjax) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }
  const redirectUrl = (redirectBack.split('#')[0] || '/') + '#thankyou';
  return Response.redirect(redirectUrl, 303);
}
