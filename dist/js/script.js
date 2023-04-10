"use strict";

AOS.init({
  once: true
});
var burgerButton = document.querySelector(".burger-button");

function removeActiveClass(elements, activeClass) {
  elements.forEach(function (element) {
    element.classList.remove(activeClass);
  });
}

var burgerMenuWidth = window.matchMedia("(max-width: 920px)");
var siteNavigation = document.querySelector(".main-header__navigation");

if (siteNavigation) {
  var siteNavigationLinks = siteNavigation.querySelectorAll(".site-navigation__link");
  siteNavigationLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      removeActiveClass(siteNavigationLinks, "site-navigation__link--active");
      e.target.classList.add("site-navigation__link--active");

      if (siteNavigation.classList.contains("main-header__navigation--active")) {
        closeSiteNavigation();
      }
    });
  });
}

if (burgerButton) {
  burgerButton.addEventListener("click", function () {
    burgerButton.classList.toggle("burger-button--active");

    if (burgerButton.classList.contains("burger-button--active")) {
      openSiteNavigation();
    } else {
      closeSiteNavigation();
    }
  });
}

function openSiteNavigation() {
  var siteNavigationOverlay = document.querySelector(".main-header__overlay");
  var html = document.querySelector(".index-html");
  var widthScroll = window.innerWidth - document.body.offsetWidth + "px";
  html.classList.add("no-scroll");
  siteNavigation.classList.add("main-header__navigation--active");
  siteNavigationOverlay.classList.add("main-header__overlay--active");
  document.body.style.paddingRight = widthScroll;

  if (siteNavigationOverlay.classList.contains("main-header__overlay--active")) {
    siteNavigationOverlay.addEventListener("click", closeSiteNavigation);
  }
}

function closeSiteNavigation() {
  var siteNavigationOverlay = document.querySelector(".main-header__overlay");
  var html = document.querySelector(".index-html");
  burgerButton.classList.remove("burger-button--active");
  html.classList.remove("no-scroll");
  siteNavigation.classList.remove("main-header__navigation--active");
  siteNavigationOverlay.classList.remove("main-header__overlay--active");
  document.body.style.paddingRight = 0;
}

document.addEventListener("keydown", function (e) {
  if (siteNavigation.classList.contains("main-header__navigation--active") && e.keyCode === 27) {
    closeSiteNavigation();
  }
});

function changeMenuView(width) {
  if (!width) {
    closeSiteNavigation();
  }
}

burgerMenuWidth.onchange = function (e) {
  changeMenuView(e.matches);
};

var slider = document.querySelector(".swiper");
var mobileSliderWidth = window.matchMedia("(max-width: 600px)");
var mySwiper;

function mobileSlider(mobileSliderWidth) {
  if (mobileSliderWidth == true && slider.dataset.mobile == "false") {
    mySwiper = new Swiper(slider, {
      slidesPerView: "auto",
      spaceBetween: 30,
      centeredSlides: true
    });
    slider.dataset.mobile = "true";
  }

  if (mobileSliderWidth == false) {
    slider.dataset.mobile = "false";

    if (slider.classList.contains("swiper-initialized")) {
      mySwiper.destroy();
    }
  }
}

mobileSlider(mobileSliderWidth.matches);

mobileSliderWidth.onchange = function (e) {
  mobileSlider(e.matches);
};