// 'use strict'
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const section = document.querySelectorAll('section');
const dots = document.querySelectorAll('.dots__dot');
const count1 = document.querySelector('.dots__count-1');
const count2 = document.querySelector('.dots__count-2');


let ind = 0;
let max = section.length - 1;
const init = function() {
  section[ind].style.transform = 'scale(1)';
  dots[ind].classList.add('active');
  count1.innerHTML = ind + 1;
  count2.innerHTML = max + 1;
}
init();

// .............................
const deactivateDots = function() {
  dots.forEach((dot) => dot.classList.remove('active'));
}

// HELPER FUNCTIONs
const nextSec = function() {
  if (ind !== max) {
    section[ind].style.transform = 'translateX(-100%)';
    section[ind + 1].style.transform = 'scale(1)';
    deactivateDots();
    dots[ind + 1].classList.add('active');
    ind++
    count1.innerHTML = ind + 1;
  } else {
    ind = 0;
    section.forEach((sec) => {
      sec.style.transform = 'translateX(0%) scale(1.2)';
    })
    section[ind].style.transform = 'scale(1)';
    deactivateDots();
    dots[ind].classList.add('active');
    count1.innerHTML = ind + 1;
  }
}

// ................................................
const prevSec = function() {
  if (ind !== 0) {
    ind--
    section[ind].style.transform = 'translateX(0%)';
    section[ind + 1].style.transform = 'scale(1.2)';
    deactivateDots();
    dots[ind].classList.add('active');
    count1.innerHTML = ind + 1;
  } else {
    ind = max;
    section.forEach((sec) => {
      sec.style.transform = 'translateX(-100%)';
    })
    section[ind].style.transform = 'translateX(0%)';
    deactivateDots();
    dots[ind].classList.add('active');
    count1.innerHTML = ind + 1;
  }
}

// ................................................
btnRight.addEventListener('click', nextSec)
btnLeft.addEventListener('click', prevSec)

document.addEventListener('keydown', function(e) {
  console.log(e.key)
  e.key === "ArrowRight" && nextSec();
  e.key === "ArrowLeft" && prevSec();
})
document.addEventListener('wheel', function(e) {
  e.deltaY > 0 && nextSec();
  e.deltaY < 0 && prevSec();
})