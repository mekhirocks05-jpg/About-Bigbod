const navbar = document.getElementById('navbar');
const openBtn = document.getElementById('open-sidebar-button');

function openSidebar() {
    navbar.classList.add('show');
    openBtn.classList.add('hide');
}

function closeSidebar() {
    navbar.classList.remove('show');

    setTimeout(() => {
        openBtn.classList.remove('hide');
    }, 100);
}


