const cardLists = document.getElementsByClassName('card-list');

data.sort(() => Math.random() - 0.5);
let cardListSize = window.innerWidth > 1279.5 ? 3 : 
    window.innerWidth > 767.5 ? 2 : 1;

let dataList = [
    data.slice(0, cardListSize),
    data.slice(cardListSize, 2 * cardListSize),
    cardListSize == 3 ? [...data.slice(6, 8), data[0]] :
    data.slice(2 * cardListSize, 3 * cardListSize)
];

for(let i = 0; i < dataList.length; i++) {
    for(let j = 0; j < cardListSize; j++) {
        cardLists[i].appendChild(createCard(dataList[i][j], data.indexOf(dataList[i][j])));
    }
}

const buttonPrev = document.getElementsByClassName('button-icon')[0];
const buttonNext = document.getElementsByClassName('button-icon')[1];
const wrapper = document.getElementsByClassName('card-list-wrapper')[0];
wrapper.scrollLeft = wrapper.offsetWidth + 40;

buttonPrev.addEventListener('click', () => {
    buttonPrev.style.pointerEvents = 'none';
    buttonNext.style.pointerEvents = 'none';

    wrapper.style.scrollBehavior = 'smooth';
    wrapper.scrollLeft -= wrapper.offsetWidth + 40;

    setTimeout(() => {
        const temp = data.filter(item => !dataList[0].includes(item));
        temp.sort(() => Math.random() - 0.5);

        dataList[2] = [...dataList[1]];
        dataList[1] = [...dataList[0]];
        dataList[0] = temp.slice(0, cardListSize);
        updateCards();

        wrapper.style.scrollBehavior = 'auto';
        wrapper.scrollLeft += wrapper.offsetWidth + 40;

        buttonPrev.style.pointerEvents = 'auto';
        buttonNext.style.pointerEvents = 'auto';
    }, 600);
});

buttonNext.addEventListener('click', () => {
    buttonPrev.style.pointerEvents = 'none';
    buttonNext.style.pointerEvents = 'none';

    wrapper.style.scrollBehavior = 'smooth';
    wrapper.scrollLeft += wrapper.offsetWidth + 50;

    setTimeout(() => {
        const temp = data.filter(item => !dataList[2].includes(item));
        temp.sort(() => Math.random() - 0.5);

        dataList[0] = [...dataList[1]];
        dataList[1] = [...dataList[2]];
        dataList[2] = temp.slice(0, cardListSize);
        updateCards();

        wrapper.style.scrollBehavior = 'auto';
        wrapper.scrollLeft -= wrapper.offsetWidth + 40;

        buttonPrev.style.pointerEvents = 'auto';
        buttonNext.style.pointerEvents = 'auto';
    }, 600);
});

window.onresize = () => {
    const temp = window.innerWidth > 1279.5 ? 3 :
    window.innerWidth > 767.5 ? 2 : 1;

    if(temp != cardListSize) {
        cardListSize = temp;
        resetCards();
        dataList = [
            data.slice(0, cardListSize),
            data.slice(cardListSize, 2 * cardListSize),
            cardListSize == 3 ? [...data.slice(6, 8), data[0]] :
            data.slice(2 * cardListSize, 3 * cardListSize)
        ];
        updateCards();
        wrapper.scrollLeft = wrapper.offsetWidth + 40;
    }
}

function resetCards() {
    const iterations = cardListSize - cardLists[0].childNodes.length;

    for(let i = 0; i < cardLists.length; i++) {
        if(iterations > 0) {
            for(let j = 0; j < iterations; j++) {
                cardLists[i].appendChild(createCard(dataList[0][0]));
            }
        } else if(iterations < 0) {
            for(let j = 0; j < Math.abs(iterations); j++) {
                const lastCard = cardLists[i].lastChild;
                cardLists[i].removeChild(lastCard);
            }
        }
    }
}

function updateCards() {
    for(let i = 0; i < dataList.length; i++) {
        for(let j = 0; j < cardListSize; j++) {
            const card = cardLists[i].getElementsByClassName('card')[j];
            card.key = data.indexOf(dataList[i][j]);

            const image = card.querySelector('img');
            image.src = dataList[i][j].img;
            image.alt = dataList[i][j].name;

            const title = card.querySelector('span');
            title.textContent = dataList[i][j].name;
        }
    }
}