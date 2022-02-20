
const findCatCard = document.querySelectorAll(".cat__card");

findCatCard.forEach(card => {
    card.onclick = showCatCard;
});

function showCatCard(event) {
    const findId = event.target.closest(".cat__card").id;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://sb-cats.herokuapp.com/api/show/${findId}`);

    xhr.send();
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            console.log(`Готово, получили ${xhr.response.length} байт`);
            const dataApi = JSON.parse(xhr.response).data;
            const catImgPopup = popup.querySelector(".popup__content-left");
            catImgPopup.style.backgroundImage = `url(${dataApi.img_link})`;
            const namePopup = popup.querySelector("h1");
            namePopup.innerText = dataApi.name;
            const agePopup = popup.querySelector("h2")
            agePopup.innerText = ageToStrinf(dataApi.age);
            const descriptionPopup = popup.querySelector("p");
            descriptionPopup.innerText = dataApi.description;
            popup.style.display = "block";
        }
    };
}

window.onclick = function (event) {
    if (event.target == close__modal) {
        popup.style.display = "none";
    }
}



function ageToStrinf(age) {
    let txt = '';
    let count = age % 100;
    if (count >= 5 && count <= 20) {
        txt = 'лет';
    } else {
        count = count % 10;
        if (count == 1) {
            txt = 'год';
        } else if (count >= 2 && count <= 4) {
            txt = 'года';
        } else {
            txt = 'лет';
        }
    }
    return `${age} ${txt}`;
}
