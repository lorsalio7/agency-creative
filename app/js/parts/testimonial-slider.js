const slider = document.querySelector(".swiper");
const mobileSliderWidth = window.matchMedia("(max-width: 600px)");

let mySwiper;

function mobileSlider(mobileSliderWidth) {
  if(mobileSliderWidth == true && slider.dataset.mobile == "false") {
    mySwiper = new Swiper(slider, {
      slidesPerView: "auto",
      spaceBetween: 30,
      centeredSlides: true
    });

    slider.dataset.mobile = "true";
  }

  if(mobileSliderWidth == false) {
    slider.dataset.mobile = "false";

    if(slider.classList.contains("swiper-initialized")) {
      mySwiper.destroy();
    }
  }
}

mobileSlider(mobileSliderWidth.matches);

mobileSliderWidth.onchange = (e) => {
  mobileSlider(e.matches);
}
