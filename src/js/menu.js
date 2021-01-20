"use strict";
const burgerBtn = document.querySelector(".burger");
const menu = document.querySelector(".navmenu");

burgerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (!menu.classList.contains("active")) {
        menu.classList.toggle("active");
        burgerBtn.classList.add("burger-active")
        
    } else {
        menu.classList.remove("active");
        burgerBtn.classList.remove("burger-active")
    }
});