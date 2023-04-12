const cardList = [];
const cardListLenth = 48;
let curPage = 1;

let tableSize = window.innerWidth > 1279.5 ? 8 :
window.innerWidth > 639.5 ? 6 : 3;

for(let i = 0; i < 6; i++) {
    data.sort(() => Math.random() - 0.5);
    cardList.push(...data);
}

const table = document.getElementsByClassName('cards-container')[0];
updateTable();

const icons = document.getElementsByClassName('button-icon');
const prev2 = icons[0];
const prev = icons[1];
const iconPage = icons[2];
const next = icons[3];
const next2 = icons[4];

next.addEventListener('click', () => {
    iconPage.textContent = ++curPage;
    updateTable();

    if(curPage == 2) {
        prev.classList.remove('inactive');
        prev.style.pointerEvents = 'auto';
    }
    if(curPage == 3) {
        prev2.classList.remove('inactive');
        prev2.style.pointerEvents = 'auto';
    }

    if(curPage == cardListLenth / tableSize) {
        next.classList.add('inactive');
        next.style.pointerEvents = 'none';
    }
    if(curPage == cardListLenth / tableSize - 1) {
        next2.classList.add('inactive');
        next2.style.pointerEvents = 'none';
    }
})
next2.addEventListener('click', () => {
    iconPage.textContent = curPage = cardListLenth / tableSize;
    updateTable();

    next.classList.add('inactive');
    next.style.pointerEvents = 'none';
    next2.classList.add('inactive');
    next2.style.pointerEvents = 'none';

    prev.classList.remove('inactive');
    prev.style.pointerEvents = 'auto';
    prev2.classList.remove('inactive');
    prev2.style.pointerEvents = 'auto';
})

prev.addEventListener('click', () => {
    iconPage.textContent = --curPage;
    updateTable();

    if(curPage == 1) {
        prev.classList.add('inactive');
        prev.style.pointerEvents = 'none';
    }
    if(curPage == 2) {
        prev2.classList.add('inactive');
        prev2.style.pointerEvents = 'none';
    }

    if(curPage == cardListLenth / tableSize - 1) {
        next.classList.remove('inactive');
        next.style.pointerEvents = 'auto';
    }
    if(curPage == cardListLenth / tableSize - 2) {
        next2.classList.remove('inactive');
        next2.style.pointerEvents = 'auto';
    }
})
prev2.addEventListener('click', () => {
    iconPage.textContent = curPage = 1;
    updateTable();

    next.classList.remove('inactive');
    next.style.pointerEvents = 'auto';
    next2.classList.remove('inactive');
    next2.style.pointerEvents = 'auto';

    prev.classList.add('inactive');
    prev.style.pointerEvents = 'none';
    prev2.classList.add('inactive');
    prev2.style.pointerEvents = 'none';
})

window.onresize = () => {
    const temp = window.innerWidth > 1279.5 ? 8 :
    window.innerWidth > 639.5 ? 6 : 3;

    if(temp != tableSize) {
        iconPage.textContent = curPage = 1;
        tableSize = temp;
        updateTable();

        next.classList.remove('inactive');
        next.style.pointerEvents = 'auto';
        next2.classList.remove('inactive');
        next2.style.pointerEvents = 'auto';

        prev.classList.add('inactive');
        prev.style.pointerEvents = 'none';
        prev2.classList.add('inactive');
        prev2.style.pointerEvents = 'none';
    }

}

function updateTable() {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    for(let i = 0; i < tableSize; i++) {
        table.appendChild(createCard(cardList[(curPage - 1) * tableSize + i], data.indexOf(cardList[(curPage - 1) * tableSize + i])));
    }
}
