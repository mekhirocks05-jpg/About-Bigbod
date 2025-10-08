const navbar = document.getElementById('navbar');
const openBtn = document.getElementById('open-sidebar-button');
const openButton= document.getElementById('open-sidebar-button');
const media= window.matchMedia("(max-width: < 700px)");

media.addEventListener('change', (e) => updateNavbar(e))


function updateNavbar(e){
    const isMobile = e.matches
console.log(isMobile)
    if(isMobile){
        navbar.setAttribute('inert', '')
    }
    else{
        navbar.removeAttribute('inert')
    }
}

function openSidebar() {
    navbar.classList.add('show');
    openBtn.classList.add('hide');
    openButton.setAttribute('aria-expanded', 'true');
    navbar.removeAttribute('inert');
}

function closeSidebar() {
    navbar.classList.remove('show');
    openButton.setAttribute('aria-expanded', 'false');
    navbar.setAttribute('inert', '');

    setTimeout(() => {
        openBtn.classList.remove('hide');
    }, 100);
}


updateNavbar(media);

const mainWindow = document.getElementById('main-window');
const pages = document.querySelectorAll('.window-page');
const icons = document.querySelectorAll('.desktop-icon');
const closeBtn = document.getElementById('close-main');
const header = document.getElementById('window-header');

let savedPosition = { top: '10%', left: '15%' };
let isDragging = false;
let offsetX, offsetY;
let currentX = 0, currentY = 0;

function openPage(pageId) {
    mainWindow.style.top = savedPosition.top;
    mainWindow.style.left = savedPosition.left;
    mainWindow.classList.add('visible');
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        const page = icon.getAttribute('data-page');
        openPage(page);
    });
});

closeBtn.addEventListener('click', () => {
    mainWindow.classList.remove('visible');
});

// show home by default
openPage('home-page');

// Smooth dragging functionality
header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - mainWindow.offsetLeft;
    offsetY = e.clientY - mainWindow.offsetTop;
    header.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX - offsetX;
    currentY = e.clientY - offsetY;
    requestAnimationFrame(() => {
        mainWindow.style.left = `${currentX}px`;
        mainWindow.style.top = `${currentY}px`;
    });
});

window.addEventListener('mouseup', () => {
    if (isDragging) {
        savedPosition = {
            top: mainWindow.style.top,
            left: mainWindow.style.left
        };
    }
    isDragging = false;
    header.style.cursor = 'grab';
});