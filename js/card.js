

const catImage = document.querySelector(".cat__img");
const logo = document.querySelector(".header__logo");
const addForm = document.querySelector(".add-img")



if (+localStorage.getItem('catsData') === 0) {
    getAllCatsPromise();
} else {
    createCatCards(JSON.parse(localStorage.getItem('catsData')));
}

function handler(event) {
    localStorage.clear();
    window.location.reload();
}

async function addNewCatCard() {
    const newId = await nextId();
    openModal(editModal);

    const formAdd = document.querySelector(".form__container");
    const buttonDecline = document.querySelector(".changes_decline");
    const buttonSave = document.querySelector(".changes_save");
    const editFavourite = formAdd.querySelector("#favourite");
    //const editDescription = formAdd.querySelector("#description");
    const inputs = formAdd.querySelectorAll(".input-form");
    //const editId = formAdd.querySelector("#id");
    const newCat = {};

    buttonDecline.addEventListener("click", cancelChanges);
    buttonSave.addEventListener("click", saveChanges);

    function cancelChanges() {
        closeModal();
    }

    async function saveChanges(e) {
        e.preventDefault();
        inputs.forEach(input => {
            newCat[input.name] = input.value;
        })
        newCat.favourite = editFavourite.checked;
        newCat.id = newId;
        const catData = JSON.parse(localStorage.getItem('catsData'));
        catData[newCat.id] = newCat;
        localStorage.setItem('catsData', JSON.stringify(catData));
        let response = await fetch('https://sb-cats.herokuapp.com/api/add ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCat)
        });
        let result = await response.json();
        console.log(result);
        closeModal();
        window.location.reload();
    }
}

async function nextId() {
    const url = 'https://sb-cats.herokuapp.com/api/show';
    let response = await fetch(url);
    if (response.ok) {
        let data = await response.json();
        if (data.message === 'ok') {
            return getMaxId(data.data) + 4;
        } else {
            console.log(data.error);
        }
    } else {
        console.log(response.error());
    }
}

function getMaxId(data) {
    const arr = [];
    for (let val of Object.values(data)) {
        if ((val.id)) {
            arr.push(val.id);
        }
    }
    return Math.max(...arr);
}

function getAllCatsPromise() {
    const url = 'https://sb-cats.herokuapp.com/api/show';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('catsData', JSON.stringify(data.data));
            createCatCards(data.data)
        })
        .catch(error => console.log(error));
}

function createCatCards(catData) {
    const cardSection = document.querySelector("#allcats");

    for (let key of Object.keys(catData)) {
        if ((catData[key]?.id)) {
            let catCard = createCatCard(catData[key]);
            addCatCard(catCard, cardSection);
        }
    }
}

function createCatCard(catData) {
    const clone = document.querySelector("#card-template").content.cloneNode(true);
    const catCard = clone.querySelector(".cat__card");
    catCard.dataset.id = catData.id;
    catCard.onclick = showCatCard;
    const newImg = clone.querySelector(".cat__img");
    newImg.style.backgroundImage = `url("${catData.img_link}"),url('img/noimage.jpg')`;
    const newH3 = clone.querySelector("H3")
    newH3.textContent = catData.name;
    let newP = clone.querySelector("p");
    for (let i = 1; i <= 10; i++) {
        if (i <= catData?.rate) {
            newP = addRate(newP);
        } else {
            newP = addEmptyRate(newP);
        }
    }

    return clone;
}

function addCatCard(childElement, parentElement) {
    parentElement.appendChild(childElement);
}

function addRate(el) {
    const whiteCat = document.createElement("img")
    whiteCat.src = 'img/kot.jpg'
    whiteCat.width = 20;
    whiteCat.height = 20;
    el.appendChild(whiteCat);
    return el;
}

function addEmptyRate(el) {
    const blackCat = document.createElement("img")
    blackCat.src = 'img/white-kot.jpg'
    blackCat.width = 20;
    blackCat.height = 20;
    el.appendChild(blackCat);
    return el;
}

function addCatCard(childElement, parentElement) {
    parentElement.appendChild(childElement);
}

logo.addEventListener("click", handler)

addForm.addEventListener("click", (e) => {
    if (!Cookies.get('username')) {
        window.location.replace('auth.html')
    } else {
        addNewCatCard();
    }
});


