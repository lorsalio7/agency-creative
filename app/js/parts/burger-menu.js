const burgerButton = document.querySelector(".burger-button");

let header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
  let offsetTop = window.pageYOffset;
  if(offsetTop > 0) {
    header.classList.add("main-header--active");
  } else {
    header.classList.remove("main-header--active");
  }
});

function removeActiveClass(elements, activeClass) {
  elements.forEach(element => {
    element.classList.remove(activeClass);
  });
}

const burgerMenuWidth = window.matchMedia("(max-width: 920px)");
const siteNavigation = document.querySelector(".main-header__navigation");

if(siteNavigation) {
  const siteNavigationLinks = siteNavigation.querySelectorAll(".site-navigation__link");

  siteNavigationLinks.forEach(link => {

    link.addEventListener("click", (e) => {
      removeActiveClass(siteNavigationLinks, "site-navigation__link--active");
      e.target.classList.add("site-navigation__link--active");

      if(siteNavigation.classList.contains("main-header__navigation--active")) {
        closeSiteNavigation();
      }
    })
  })
}


if(burgerButton) {

  burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("burger-button--active");

    if(burgerButton.classList.contains("burger-button--active")) {
      openSiteNavigation();
    } else {
      closeSiteNavigation();
    }
  })

}


function openSiteNavigation() {
  const siteNavigationOverlay = document.querySelector(".main-header__overlay");
  const html = document.querySelector(".index-html");

  let widthScroll = window.innerWidth - document.body.offsetWidth + "px";
  burgerButton.style.marginRight = widthScroll;
  html.classList.add("no-scroll");
  siteNavigation.classList.add("main-header__navigation--active");
  siteNavigationOverlay.classList.add("main-header__overlay--active");

  document.body.style.paddingRight = widthScroll;
  if(siteNavigationOverlay.classList.contains("main-header__overlay--active")) {
    siteNavigationOverlay.addEventListener("click", closeSiteNavigation);
  }
}

function closeSiteNavigation() {
  const siteNavigationOverlay = document.querySelector(".main-header__overlay");
  const html = document.querySelector(".index-html");
  burgerButton.style.marginRight = 0;
  burgerButton.classList.remove("burger-button--active");
  html.classList.remove("no-scroll");
  siteNavigation.classList.remove("main-header__navigation--active");
  siteNavigationOverlay.classList.remove("main-header__overlay--active");
  document.body.style.paddingRight = 0;
}

document.addEventListener("keydown", (e) => {
  if(siteNavigation.classList.contains("main-header__navigation--active") && e.keyCode === 27) {
    closeSiteNavigation();
  }
});

function changeMenuView(width) {
  if(!width) {
    closeSiteNavigation();
  }
}

burgerMenuWidth.onchange = (e) => {
  changeMenuView(e.matches);
}
