// Липкое меню с эффектом при прокрутке
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Добавляем класс при прокрутке для усиления тени
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Плавное закрытие dropdown при клике вне меню
document.addEventListener('click', (e) => {
    const dropdowns = document.querySelectorAll('.has-dropdown');
    
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// Подсветка активного пункта меню при прокрутке
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Анимация появления элементов при загрузке
window.addEventListener('load', () => {
    navbar.style.animation = 'slideDown 0.5s ease';
});

// Дополнительная функциональность: закрытие dropdown при клике на ссылку
const dropdownLinks = document.querySelectorAll('.dropdown-menu a');

dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Можно добавить дополнительную логику
        console.log(`Переход на: ${link.textContent}`);
    });
});

// Опциональная анимация
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .nav-link.active {
        color: #2563eb;
        background-color: #eff6ff;
    }
`;
document.head.appendChild(style);

// Улучшенная работа с выпадающим меню для touch устройств
const hasDropdownItems = document.querySelectorAll('.has-dropdown');

hasDropdownItems.forEach(item => {
    let clickCount = 0;
    const link = item.querySelector('.nav-link');
    
    link.addEventListener('click', (e) => {
        // На мобильных устройствах
        if (window.innerWidth <= 768) {
            e.preventDefault();
            
            // Закрываем другие открытые dropdown
            hasDropdownItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий dropdown
            item.classList.toggle('active');
        }
    });
});

// ========== ПОЛНОЭКРАННОЕ МЕГА-МЕНЮ ==========

const megaMenuBtn = document.getElementById('megaMenuBtn');
const megaMenuOverlay = document.getElementById('megaMenuOverlay');
const megaMenuClickableArea = document.getElementById('megaMenuClickableArea');
const body = document.body;

// Открытие мега-меню
function openMegaMenu() {
    megaMenuOverlay.classList.add('active');
    body.classList.add('mega-menu-open');
}

// Закрытие мега-меню
function closeMegaMenu() {
    megaMenuOverlay.classList.remove('active');
    body.classList.remove('mega-menu-open');
    
    // Можно добавить счетчик использований для аналитики
    if (typeof window.menuCloseCount === 'undefined') {
        window.menuCloseCount = 0;
    }
    window.menuCloseCount++;
}

// Клик по кнопке открытия
megaMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openMegaMenu();
});

// Клик по видимой области снизу для закрытия
megaMenuClickableArea.addEventListener('click', closeMegaMenu);

// Закрытие по клику на фон overlay или пустое пространство
megaMenuOverlay.addEventListener('click', (e) => {
    // Закрываем если клик по самому overlay или по пустому пространству контента
    if (e.target === megaMenuOverlay || e.target.classList.contains('mega-menu-content')) {
        closeMegaMenu();
    }
});

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && megaMenuOverlay.classList.contains('active')) {
        closeMegaMenu();
    }
});

// Раскрытие/закрытие категорий
const categoryHeaders = document.querySelectorAll('.mega-category-header');

categoryHeaders.forEach(header => {
    header.addEventListener('click', function() {
        const category = this.parentElement;
        const isExpanded = category.classList.contains('expanded');
        
        // Опционально: закрываем все другие категории в той же колонке
        // const column = category.closest('.mega-column');
        // column.querySelectorAll('.mega-category').forEach(cat => {
        //     cat.classList.remove('expanded');
        // });
        
        // Переключаем текущую категорию
        if (isExpanded) {
            category.classList.remove('expanded');
        } else {
            category.classList.add('expanded');
        }
    });
});

// Закрытие меню при клике на ссылку внутри
const megaLinks = document.querySelectorAll('.mega-category-content a');
megaLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMegaMenu();
    });
});

// Плавное появление подсказки при наведении на нижнюю область
megaMenuClickableArea.addEventListener('mouseenter', () => {
    megaMenuClickableArea.style.background = 'rgba(255, 255, 255, 0.05)';
});

megaMenuClickableArea.addEventListener('mouseleave', () => {
    megaMenuClickableArea.style.background = 'transparent';
});

console.log('Навигационное меню с полноэкранным мега-меню загружено успешно! 🚀');
