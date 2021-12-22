const btnSubmenuUsers = document.getElementById("btnSubmenuUsers");
const icoSubmenuUsers = document.getElementById("icoSubmenuUsers");

var userExpand = false;

btnSubmenuUsers.onclick = function () {
  if (userExpand === false) {
    icoSubmenuUsers.classList.remove("fa-plus-square");
    icoSubmenuUsers.classList.add("fa-minus-square");
    userExpand = true;
  } else {
    icoSubmenuUsers.classList.remove("fa-minus-square");
    icoSubmenuUsers.classList.add("fa-plus-square");
    userExpand = false;
    console.log(userExpand);
  }
};