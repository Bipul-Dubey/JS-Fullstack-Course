"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// ############################ element selection ################################
const learnMoreBtn = document.querySelector(".btn--scroll-to");
const navLinks = document.querySelector(".nav__links");
const nav = document.querySelector(".nav");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const header = document.querySelector(".header");

// ##################### handlers ####################
learnMoreBtn.addEventListener("click", (e) => {});

// ========== scroll to a section ===============
navLinks.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// =============== tab components ===================
tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  // remove the active tab class from each tan
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  // add active class name to the click button
  clicked.classList.add("operations__tab--active");

  // remove the active content class from content container
  tabsContent.forEach((t) => t.classList.remove("operations__content--active"));
  // activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// =========== menu fade animation ============
// nav.addEventListener("mouseover", (e) => {
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");

//     siblings.forEach((el) => {
//       if (el != link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity == 0.5;
//   }
// });

// nav.addEventListener("mouseout", (e) => {
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");

//     siblings.forEach((el) => {
//       if (el != link) el.style.opacity = 1;
//     });
//     logo.style.opacity == 1;
//   }
// });

// ============= optimization ===============
const handleOver = (e, opacity) => {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el != link) el.style.opacity = opacity;
    });
    logo.style.opacity == opacity;
  }
};

nav.addEventListener("mouseover", (e) => {
  handleOver(e, 0.5);
});
nav.addEventListener("mouseout", (e) => {
  handleOver(e, 1);
});

// =============== scroll event =============
// const initialCord = section1.getBoundingClientRect();
// window.addEventListener("scroll", () => {
//   if (window.scrollY > initialCord.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

// ====== Sticky navigation: Intersection Observer API ========
/*  this Intersection Observer API allows our code to basically observe changes
 to tha way that a certain target element intersects another element
 or the way it intersect the viewport */

// =========== Observer ===========
// const obsCallback = (entries, observer) => {
//   // entries is array of threshold entry,
//   entries.forEach((entry) => console.log(entry));
// };

// const obsOption = {
//   root: null, // null viewport
//   // threshold: 0.1,
//   threshold: [0, 30, 50],
// };

// const observe = new IntersectionObserver(obsCallback, obsOption);
// observe.observe(section1);

// obsCallback called each time when the observe element intersection
// with root element given in obsOption at given threshold

// ==== sticky using observer api ====
const navHeight = nav.getBoundingClientRect().height;

const stickNav = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const stickyObserver = new IntersectionObserver(stickNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
stickyObserver.observe(header);

// ############# reveal content when they in viewport ###########
const allSections = document.querySelectorAll(".section");

const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// ============= image lazy loading ==============
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// ============== slider (not requried right now)================

// =========== event during lifecyle of webpage ===============
/*
- DOMContentLoaded - when HTML parsed and load
- load - when html loaded finish
- beforeunload - fire when use is about to leave site
*/

// == efficient loading of script - defer and aysnc ==
// -- regulare way to add script using script element
// -- we can also add async or defer attribute in script element
