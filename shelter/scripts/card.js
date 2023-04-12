function createCard(cardInfo, key) {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = cardInfo.img;
    image.alt = cardInfo.name;

    const title = document.createElement('span');
    title.classList.add('pets-card-title');
    title.textContent = cardInfo.name;

    const button = document.createElement('button');
    button.classList.add('button-secondary');
    button.textContent = 'Learn more';

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(button);

    card.key = key;
    card.addEventListener('click', () => openModal(card.key));

    return card;
}

const modalWrapper = document.getElementsByClassName('modal-wrapper')[0];
const modalButton = modalWrapper.getElementsByClassName('button-icon')[0];
const modalWindow = modalWrapper.getElementsByClassName('modal-window')[0];


modalWrapper.addEventListener('click', hideModal);
modalButton.addEventListener('click', hideModal);
modalWindow.addEventListener('click', e => e.stopPropagation())

function hideModal() {
    modalWrapper.style.display = 'none';
    html.style.overflowY = 'auto';
}

function openModal(key) {
    const info = data[key];
    modalWrapper.style.display = 'flex';
    html.style.overflowY = 'hidden';

    const img = modalWrapper.getElementsByTagName('img')[0];
    img.src = info.img;

    const h3 = modalWrapper.getElementsByTagName('h3')[0];
    h3.textContent = info.name;

    const h4 = modalWrapper.getElementsByTagName('h4')[0];
    h4.textContent = info.type + ' - ' + info.breed;

    const h5 = modalWrapper.getElementsByTagName('h5')[0];
    h5.textContent =  info.description;

    const li = document.getElementsByTagName('li');
    li[0].textContent = 'Age: ' + info.age;
    li[1].textContent = 'Inoculations: ' +  info.inoculations.join(', ');
    li[2].textContent = 'Diseases: ' + info.diseases.join(', ');
    li[3].textContent = 'Parasites: ' + info.parasites.join(', ');
}
