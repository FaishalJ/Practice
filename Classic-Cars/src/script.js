const body = document.querySelector(".container");
const btnMenu = document.querySelector(".btn__menu");
const sections = document.querySelectorAll("section");
const video = document.querySelectorAll("video");


// body rotate event
btnMenu.addEventListener('click', () => {
  body.classList.toggle('rotate');
})
sections.forEach((el) => {
  el.addEventListener('click', () => {
    body.classList.remove('rotate')
  })
})

video.forEach((vid) => {
  vid.addEventListener('mouseover', () => {
    vid.play();
  })
  vid.addEventListener('mouseout', () => {
    vid.pause();
  })
})