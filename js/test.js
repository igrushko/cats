

if (!Cookies.get('username')) {
    userUndefinedSetImage();

} else {
    let userName = Cookies.get('username');
    userAuthentificatedSetImage();

    enableEdit();
    enableDelete();
}

function userUndefinedSetImage() {
    const userImg = document.querySelector(".header__user");
    userImg.classList.add("header-noname");
}

function userAuthentificatedSetImage() {
    const userImg = document.querySelector(".header__user");
    userImg.classList.add("header-username");
  }

function enableEdit() {
    const imgEdit = document.querySelector("#editimg");
    imgEdit.classList.add("enableEdit");
}

function enableDelete() {
    const imgEdit = document.querySelector("#deleteimg");
    imgEdit.classList.add("enableDelete");
}

function disableEdit() {
    const imgEdit = document.querySelector("enableEdit");
    imgEdit && imgEdit.classList.remove("enableEdit");
}

function disableDelete() {
    const imgEdit = document.querySelector("enableDelete");
    imgEdit && imgEdit.classList.remove("enableDelete");
}