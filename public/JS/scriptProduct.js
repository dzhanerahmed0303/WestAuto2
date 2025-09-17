"use strict";

let index = 0;
let favbutton = document.querySelector(".favorieten");

favbutton.addEventListener("click", () => {
  if (index === 0) {
    favbutton.innerHTML = '<i class="fa-solid fa-heart"></i>';
    index = 1;
  } else {
    favbutton.innerHTML = '<i class="fa-regular fa-heart"></i>';
    index = 0;
  }
});
