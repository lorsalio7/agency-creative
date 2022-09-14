"use strict";

AOS.init({
  once: true
});
var burgerButton = document.querySelector(".burger-button");
var siteNavigationOverlay = document.querySelector(".main-header__overlay");
var siteNavigation = document.querySelector(".main-header__navigation");
var html = document.querySelector(".index-html");

function openSiteNavigation() {
  html.classList.toggle("no-scroll");
  burgerButton.classList.toggle("burger-button--active");
  siteNavigation.classList.toggle("main-header__navigation--active");
  siteNavigationOverlay.classList.toggle("main-header__overlay--active");
}

burgerButton.addEventListener("click", openSiteNavigation);
var slider = document.querySelector(".swiper");
var mySwiper;

function mobileSlider() {
  if (window.innerWidth <= 600 && slider.dataset.mobile == "false") {
    mySwiper = new Swiper(slider, {
      slidesPerView: "auto",
      spaceBetween: 30,
      centeredSlides: true
    });
    slider.dataset.mobile = "true";
  }

  if (window.innerWidth > 600) {
    slider.dataset.mobile = "false";

    if (slider.classList.contains("swiper-initialized")) {
      mySwiper.destroy();
    }
  }
}

mobileSlider();
window.addEventListener("resize", function () {
  mobileSlider();
});