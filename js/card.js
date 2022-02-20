let xhr = new XMLHttpRequest();
xhr.open('GET', "https://sb-cats.herokuapp.com/api/show");

xhr.send();
xhr.onload = function () {
    if (xhr.status != 200) {
        console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
        const dataApi = JSON.parse(xhr.response).data;

        for (let key of Object.keys(dataApi)) {
            if (dataApi[key]?.id) {
                const divCatCard = document.createElement("div")
                divCatCard.id = dataApi[key].id
                divCatCard.className = "cat__card";
                const divCatImg = document.createElement("div")
                divCatImg.className ="cat__img";
                divCatImg.style.backgroundImage =`url(${dataApi[key].img_link})`;
                divCatCard.appendChild(divCatImg);
                const h3=document.createElement("h3");
                h3.innerText=dataApi[key].name;
                divCatCard.appendChild(h3);
                let p=document.createElement("p");
                p.className = "cat__rate";
                for (let i=1; i<=10; i++) {
                    if (i<=dataApi[key].rate) {
                        p = blackCat(p);
                        console.log(p);
                    } else {
                        p = whiteCat(p);
                    }
                }
                divCatCard.appendChild(p);
                divCatCard.onclick= showCatCard;
                allcats.appendChild(divCatCard);

            }
        }

    }

}

function blackCat (el) {
    let crImg = document.createElement("img")
    crImg.src = 'img/kot.jpg'
    crImg.width = 20;
    crImg.height = 20;
    el.appendChild(crImg);
    return el;
}

function whiteCat (el) {
    let crImg = document.createElement("img")
    crImg.src = 'img/white-kot.jpg'
    crImg.width = 20;
    crImg.height = 20;
    el.appendChild(crImg);
    return el;
}