AOS.init({
  once: true
});

const burgerButton = document.querySelector(".burger-button");
const siteNavigationOverlay = document.querySelector(".main-header__overlay");
const siteNavigation = document.querySelector(".main-header__navigation");
const html = document.querySelector(".index-html");


function openSiteNavigation() {
  html.classList.toggle("no-scroll");
  burgerButton.classList.toggle("burger-button--active");
  siteNavigation.classList.toggle("main-header__navigation--active");
  siteNavigationOverlay.classList.toggle("main-header__overlay--active");
}

burgerButton.addEventListener("click", openSiteNavigation);


const slider = document.querySelector(".swiper");


let mySwiper;

function mobileSlider() {
  if(window.innerWidth <= 600 && slider.dataset.mobile == "false") {
    mySwiper = new Swiper(slider, {
      slidesPerView: "auto",
      spaceBetween: 30,
      centeredSlides: true
    });

    slider.dataset.mobile = "true";
  }

  if(window.innerWidth > 600) {
    slider.dataset.mobile = "false";

    if(slider.classList.contains("swiper-initialized")) {
      mySwiper.destroy();
    }

  }
}

mobileSlider();

window.addEventListener("resize", () => {
  mobileSlider();
})
