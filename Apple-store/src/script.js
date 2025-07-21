"use strict"
// header selection
const header = document.querySelector(".header");
const slideShow = document.querySelector(".header__slideShow");
const btnControl = document.querySelector(".control-buttons");
const box = document.querySelector(".box");
const btn = document.querySelectorAll(".btn");

// section two selection
const sectionTwo = document.querySelector(".section__two");
const laptop = document.querySelector(".section__two--laptop");

// section three selection
const btnUp = document.querySelector(".section__three--btn-up");
const btnDown = document.querySelector(".section__three--btn-down");
const btnRight = document.querySelector(".section__three--btn-right");
const btnLeft = document.querySelector(".section__three--btn-left");
const btnAll = document.querySelectorAll(".section__three--btn");
const watchBand = document.querySelector(".section__three--watch-band");
const watchCase = document.querySelector(".section__three--watch-case");

// SLIDE SHOW /////////////////////////////////////////////////////////////
const slideBackground = function() {
  for (let i = 1; i <= 5; i++) {
    const div = document.createElement("div")
    div.style.backgroundImage = `url("src/images/slideshow/section-1-bg-${i}.jpg")`;
    // i === 1 && div.classList.add("change");
    slideShow.append(div);
  }
}
slideBackground();

const backgroundImage = document.querySelectorAll('.header__slideShow div');
backgroundImage[0].classList.add('change');
let index = 1;
let max = backgroundImage.length;

const showBackground = function() {
  if (index >= 0 && index < max-1) {
    index++;
    backgroundImage.forEach((el) => el.classList.remove('change'));
    backgroundImage[index].classList.add('change');
  } else {
    index = 0;
    backgroundImage.forEach((el) => el.classList.remove('change'));
    backgroundImage[index].classList.add('change');
  }
}

setInterval(showBackground, 20000);

// BOX TRANSFORMATION
let x = 0;
let y = 0;
let z = 0;
let rotate = true;
let interval;

// ROATE BOX
const rotateBox = function() {
  box.style.transform = `rotateX(${x}deg) rotateY(${y++}deg) rotateZ(${z}deg)`;
}
interval = setInterval(rotateBox, 100);

// STOP ROTATION ON HOVER
btnControl.addEventListener("mouseover", function() {
  if(!rotate) return;
  clearInterval(interval);
});

btnControl.addEventListener("mouseout", function() {
  rotate = true;
  interval = setInterval(rotateBox, 100)
});


// ROTATE BOX ON BUTTON CLICK
btnControl.addEventListener('click', function(e) {
  console.log(e.target)
  if(!e.target.classList.contains("arrow")) return
  const name = e.target.getAttribute('id').slice(1);

  if(name === "arrow-up") box.style.transform = `rotateX(${x+=20}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
  if(name === "arrow-down") box.style.transform = `rotateX(${x-=20}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
  if(name === "arrow-left") box.style.transform = `rotateX(${x}deg) rotateY(${y-=20}deg) rotateZ(${z}deg)`;
  if(name === "arrow-right") box.style.transform = `rotateX(${x}deg) rotateY(${y+=20}deg) rotateZ(${z}deg)`;
  if(name === "arrow-top-right") box.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z+=20}deg)`;
  if(name === "arrow-bottom-left") box.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z-=20}deg)`;
})


// INTERSECTION OBSERVER FOR SECTION 2 OPEN LAPTOP
laptop.classList.remove("change");
const openLaptop = function([entries]) {
  // const {entries} = 
  if(!entries.isIntersecting) return;
  console.log(entries);
  laptop.classList.add("change");
}

const option = {
  root: null,
  threshold: 0.4
}
const observer = new IntersectionObserver(openLaptop, option);
observer.observe(sectionTwo);

// WATCH SELECTION WITH BUTTONS
let up = 0;
let  right = 0;

const removeHidden = function(el) {
 el.classList.remove("hidden");
}

btnUp.addEventListener("click", function() {
  watchCase.style.marginTop = `${up -= 35}rem`;
  up <= -140 ? this.classList.add('hidden') : removeHidden(btnDown);
})

btnDown.addEventListener("click", function() {
  watchCase.style.marginTop = `${up += 35}rem`
  up === 175 ? this.classList.add("hidden") :  removeHidden(btnUp);
})

btnRight.addEventListener("click", function() {
  watchBand.style.marginLeft = `${right -= 35}rem`
  right === -175 ? this.classList.add("hidden") :  removeHidden(btnLeft);
})

btnLeft.addEventListener("click", function() {
  watchBand.style.marginLeft = `${right += 35}rem`
  right === 140 ? this.classList.add("hidden") :  removeHidden(btnRight);
})