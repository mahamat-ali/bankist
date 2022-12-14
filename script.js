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
const nav = document.querySelector('.nav');

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

///////// DOM traversing /////////

///////// BUILDING TABBED COMPONENT /////////
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    // const currentTab = e.target;

    const currentTab = e.target.closest('.operations__tab');

    if (!currentTab || !currentTab.classList.contains('operations__tab'))
      return;

    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    tabsContent.forEach(content =>
      content.classList.remove('operations__content--active')
    );

    currentTab.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${currentTab.dataset.tab}`)
      .classList.add('operations__content--active');
  });

///////// MOUSE FADE IN /////////
const navLinks = document.querySelectorAll('.nav__link');
const navLogo = document.querySelector('.nav__logo');

const fadeInHandler = function (e) {
  if (
    e.target.classList.contains('nav__link') ||
    e.target.classList.contains('nav__logo')
  ) {
    navLinks.forEach(link => (link.style.opacity = `${this}`));
    navLogo.style.opacity = `${this}`;

    e.target.style.opacity = '1';
  }
};
// const fadeInHandler = function (opacity) {
//   return function (e) {
//     if (
//       e.target.classList.contains('nav__link') ||
//       e.target.classList.contains('nav__logo')
//     ) {
//       navLinks.forEach(link => (link.style.opacity = `${opacity}`));
//       navLogo.style.opacity = `${opacity}`;

//       e.target.style.opacity = '1';
//     }
//   };
// };

nav.addEventListener('mouseover', fadeInHandler.bind(0.5));
// document.querySelector('.nav').addEventListener('mouseover', function (e) {
//   if (
//     e.target.classList.contains('nav__link') ||
//     e.target.classList.contains('nav__logo')
//   ) {
//     navLinks.forEach(link => (link.style.opacity = '0.5'));
//     navLogo.style.opacity = '0.5';

//     e.target.style.opacity = '1';
//   }
// });

document
  .querySelector('.nav')
  .addEventListener('mouseout', fadeInHandler.bind(1));
// document.querySelector('.nav').addEventListener('mouseout', function (e) {
//   if (
//     e.target.classList.contains('nav__link') ||
//     e.target.classList.contains('nav__logo')
//   ) {
//     navLinks.forEach(link => (link.style.opacity = '1'));
//     navLogo.style.opacity = '1';

//     e.target.style.opacity = '1';
//   }
// });

///////// STICKY NAV //////////////////
// const navTopCoord = section1.getBoundingClientRect().top;
// window.addEventListener('scroll', function () {
//   if (window.scrollY + nav.getBoundingClientRect().height > navTopCoord)
//     nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

///////// STICKY NAV using Intersection observer//////////////////
// const navTopCoord = section1.getBoundingClientRect().top;
// window.addEventListener('scroll', function () {
//   if (window.scrollY + nav.getBoundingClientRect().height > navTopCoord)
//     nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// new IntersectionObserver(function (entries, observer) {}, {threshold: 0.9}).observe(section1);
const navHeight = nav.getBoundingClientRect().height;
const observerCallback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const observerOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const scrollNavObserver = new IntersectionObserver(
  observerCallback,
  observerOption
);

scrollNavObserver.observe(header);

///////// Revealing elements on scroll using Intersection observer//////////////////
const revealingElementObserver = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  },
  { root: null, threshold: 0.15 }
);

allSections.forEach(section => {
  revealingElementObserver.observe(section);
  section.classList.add('section--hidden');
});

///////// Lazy loading images using Intersection observer//////////////////

const featuresImgs = document.querySelectorAll('img[data-src]');
// window.addEventListener('load', function (e) {

// });

const lazyLoadingObserverCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    this.classList.remove('lazy-img');
  });
  observer.unobserve();
};

const lazyLoadingObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: '200px', //without user noticing the lazy loading
};

const lazyLoadingObserver = new IntersectionObserver(
  lazyLoadingObserverCallback,
  lazyLoadingObserverOptions
);

featuresImgs.forEach(img => {
  lazyLoadingObserver.observe(img);
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

///////// DOM traversing /////////

// 1-downward
// const h1 = document.querySelector('h1');
// console.log(h1.querySelector('.highlight'));
// // console.log((h1.firstElementChild.style.backgroundColor = 'red'));
// // console.log((h1.lastElementChild.style.backgroundColor = 'blue'));
// // 2-upward
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// console.log(h1.closest('h1'));
// // 3-sideways
// console.log(h1.nextElementSibling);
// console.log(h1.previousElementSibling);
// console.log(h1.previousSibling);
// // console.log(h1.closest('h1')..children);
// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) {
//     // el.style.transform = 'scaleY(1.8)';
//     el.style.color = 'red';
//   }
// });
