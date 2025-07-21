const nav = document.querySelector('.navigation');
const header = document.querySelector('.header');
const customer = document.querySelector('#customer');
const team = document.querySelector('#team');
const contact = document.querySelector('#section-contact');

const btnTop = document.querySelector(".btn-top");

nav.addEventListener('click', function(e) {
  e.preventDefault()
  if(!e.target.classList.contains("navigation--link")) return;
  const target = e.target.getAttribute("href").slice(1);
  console.log(target)
  if(target === "customer") {
    customer.scrollIntoView({behavior: "smooth"})
  }
  if(target === "team") {
    team.scrollIntoView({behavior: "smooth"})
  }
  if(target === "section-contact") {
    contact.scrollIntoView({behavior: "smooth"})
  }
})

btnTop.addEventListener('click', function(e) {
  header.scrollIntoView({behavior: "smooth"});
})