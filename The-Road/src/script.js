const container = document.querySelector(".container"),
  btnNav = document.querySelector(".btn__nav"),
  theRoad = document.querySelector('.title__road');


// EVENTS
btnNav.addEventListener('click', () => {
  container.classList.toggle('show');
})