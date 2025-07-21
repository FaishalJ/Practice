// PABLO
const form = document.querySelector(".CTA__form");
const about  = document.querySelector(".about");
const navMenu = document.querySelector(".navigation__menu");
const navPopUp = document.querySelector(".navigation__popup");
const copy = document.querySelector(".copyright");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector("input[type='text']").value = "";
  document.querySelector("input[type='email']").value = "";
  document.querySelector("#story").value = "";
})

navMenu.addEventListener("click", function() {
  navPopUp.classList.toggle("show");
});


const year = new Date().getFullYear()
copy.innerHTML = year