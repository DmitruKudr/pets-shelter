let isMenuOpened = false;

const html = document.documentElement;
const burger = document.getElementById('burger');
const container = document.getElementById('nav-container');
const menu = document.getElementsByClassName('nav-menu')[0];
const menuLinks = menu.querySelectorAll('a');

window.onresize = () => {
    if(window.innerWidth > 767.5) {
        container.style.display = 'block';
    } else if(!isMenuOpened) {
        container.style.display = 'none';
    }
}

menu.addEventListener('click', e => e.stopPropagation());

burger.addEventListener('click', () => openMenu());
container.addEventListener('click', () => openMenu());
menuLinks.forEach(link => link.addEventListener('click', () => openMenu()));

function openMenu() {
    burger.classList.toggle('rotate');
    menu.classList.toggle('appear');

    burger.style.pointerEvents = 'none';
    container.style.pointerEvents = 'none';

    if(isMenuOpened) {
        setTimeout(() => {
            html.style.overflowY = 'auto';
            container.style.overflow = 'auto';
            menu.style.overflow = 'auto';

            burger.style.pointerEvents = 'auto';
            container.style.pointerEvents = 'auto';

            container.style.display = 'none';
        }, 300);

    } else {
        html.style.overflowY = 'hidden';
        container.style.overflow = 'hidden';
        menu.style.overflow = 'hidden';
        
        container.style.display = 'block';

        setTimeout(() => {
            burger.style.pointerEvents = 'auto';
            container.style.pointerEvents = 'auto';
        }, 300)
    }

    isMenuOpened = !isMenuOpened;
}