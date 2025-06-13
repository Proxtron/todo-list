import juicyBurgerImg from "./juicy-burger.png";
import { contentDiv } from "./index.js";

let homeDiv;

init();

export default function displayHomePage() {
    contentDiv.appendChild(homeDiv);
}

function init() {
    homeDiv = document.createElement("div");
    homeDiv.classList.add("home-div");
    buildHomePage();
} 

function buildHomePage() {
    const burgerImg = document.createElement("img");
    burgerImg.src = juicyBurgerImg;
    burgerImg.alt = "Delicious Burger";
    burgerImg.width = 700;
    homeDiv.appendChild(burgerImg);

    const heroTxtSection = buildHeroTxtSection();
    homeDiv.appendChild(heroTxtSection);
}

function buildHeroTxtSection() {
    const heroTxtSection = document.createElement("div");
    heroTxtSection.classList.add("hero-txt-section");
    
    const heroTxt = document.createElement("h1");
    heroTxt.classList.add("hero-txt");
    heroTxt.innerText = "Big. Juicy. Burger.";
    heroTxtSection.appendChild(heroTxt);

    const heroSubTxt = document.createElement("h2");
    heroSubTxt.classList.add("hero-subtxt");
    heroSubTxt.innerText = `
        Our 100% Angus beef patties come with enough grease to stop the heart of a marathon runner!
        Come get yours today!     
    `;
    heroTxtSection.appendChild(heroSubTxt);


    return heroTxtSection;
}
