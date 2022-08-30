'use strict';

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const message = document.createElement('div');
const allSections = document.querySelectorAll('section');
const allButtons = document.getElementsByTagName('button');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const logo = document.querySelector('.nav__logo');

///////// Modal /////////
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////// Navigation/////////
// const links = document.querySelectorAll('.nav__link');
// links.forEach(link => {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const section = document.querySelector(
//       `[id='${this.getAttribute('href').split('#')[1]}']`
//     );
//     console.log(section);
//     if (!section) return;
//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

//Navigation using event delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const link = e.target;

  if (
    link.classList.contains('nav__links') ||
    link.classList.contains('btn--show-modal')
  )
    return;

  document
    .querySelector(link.getAttribute('href'))
    .scrollIntoView({ behavior: 'smooth' });
});

///////// scrolling using getBoundingClientRect/////////
// btnScrollTo.addEventListener('click', function (e) {
//   const s1Coords = section1.getBoundingClientRect();
//   window.scroll({
//     left: Number(s1Coords.x + window.scrollX),
//     top: Number(s1Coords.top + window.scrollY),
//     behavior: 'smooth',
//   });
// });

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////
//////////////////////////////////////

///////// Selecting elements/////////

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// console.log(allSections);

// console.log(document.getElementById('section--1'));
// console.log(allButtons);

///////// Creating and inserting an element/////////
message.classList.add('cookie-message');
message.innerHTML =
  "We use cookie for improved functionality and analytics.<button class='btn btn--close-cookie'>Got it!</button>";
header.append(message);
// header.append(message.cloneNode(true));
// header.prepend(message);
// header.before(message);
// header.after(message);

///////// Deleting an element/////////
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function (e) {
    message.remove();
    // message.parentElement.removeChild(message);
  });

///////// Styling an element/////////
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

///accessing inline styles
// console.log(message.style.height); //display nothing
// console.log(message.style.backgroundColor); //display color
// console.log(getComputedStyle(message).height); //displays height

//adjusting the height of the message container
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//setting color using custom variables
// header.style.backgroundColor = 'var(--color-tertiary)';

//accessing and setting variable using setProperty
// message.style.setProperty('font-size', '14px');
// document.documentElement.style.setProperty('--color-primary', 'orangered');

///////// Attributes of an element/////////
// console.log(logo);
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.getAttribute('src'));
// console.log(logo.className);
// console.log(logo.id);

///////// data attribute on an element/////////
// console.log(logo.getAttribute('data-version-number'));
// console.log(logo.dataset);
// console.log(logo.dataset.versionNumber);

///////// class of an element/////////
// logo.classList.add('c');
// logo.classList.remove('c', 'lo');
// logo.classList.toggle('c');
// logo.classList.contains('c');

///////// Type of event and events handlers /////////
// const h1 = document.querySelector('h1');
//The advantage of addEventListener is we can call as many as we want and delete event
// h1.addEventListener('mouseenter', function () {
//   alert('addEventHandler: Great! You are reading the heading : D');
// });

// h1.addEventListener('mouseenter', function () {
//   alert('Bla bla');
// });

// h1.onmouseenter = function () {
//   alert('addEventHandler: Great! You are reading the heading : D');
// };
// h1.onmouseenter = function () {
//   alert('Blna');
// };

// const alertH1 = function () {
//   alert('addEventHandler: Great! You are reading the heading : D');
//   // h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 3000);

///////// Event bubbling in practice /////////
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min + 1;

// const randomRGB = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// const link = document.querySelector('.nav__link');
// const links = document.querySelector('.nav__links');
// const nav = document.querySelector('.nav');

// let first;

// link.addEventListener(
//   'click',
//   function (e) {
//     console.log('LINK', e.target, e.currentTarget);

//     // this.style.backgroundColor = randomRGB();
//     setTimeout(() => {
//       this.style.backgroundColor = randomRGB();
//     }, 3000);
//     first = '1';
//     console.log('====================================');
//     console.log(first);
//     console.log('====================================');
//     //// stop propagation
//     // e.stopPropagation();
//   }
//   // true
// );

// links.addEventListener(
//   'click',
//   function (e) {
//     console.log('LINKS', e.target, e.currentTarget);
//     setTimeout(() => {
//       this.style.backgroundColor = randomRGB();
//     }, 3000);

//     first = '2';
//     console.log('====================================');
//     console.log(first);
//     console.log('====================================');
//   }
//   // true
// );

// nav.addEventListener(
//   'click',
//   function (e) {
//     console.log('NAV', e.target, e.currentTarget);
//     // this.style.backgroundColor = randomRGB();

//     setTimeout(() => {
//       this.style.backgroundColor = randomRGB();
//     }, 3000);
//     first = '3';
//     console.log('====================================');
//     console.log(first);
//     console.log('====================================');
//   },
//   true //Capturing false
// );
