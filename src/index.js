import "./styles.css";
import displayHomePage from "./home.js";
import displayMenuPage from "./menu.js";
import displayAboutPage from "./about.js";

export const contentDiv = document.getElementById("content");

const homeBtn = document.getElementById("home-btn");
const menuBtn = document.getElementById("menu-btn");
const aboutBtn = document.getElementById("about-btn");
const navBtnList = document.querySelectorAll(".nav-btn");

init();

function init() {
    displayHomePage();
    attachEventListeners();
}

function attachEventListeners() {
    homeBtn.addEventListener("click", (event) => {
        toggleButtonSelectState(event.target);
        switchPage(displayHomePage);
    })
    menuBtn.addEventListener("click", (event) => {
        toggleButtonSelectState(event.target);
        switchPage(displayMenuPage);
    });
    aboutBtn.addEventListener("click", (event) => {
        toggleButtonSelectState(event.target);
        switchPage(displayAboutPage);
    });
}

function toggleButtonSelectState(buttonElement) {
    navBtnList.forEach((navBtn) => {
        navBtn.classList.remove("selected-nav-btn");
    });
    
    if(buttonElement.classList.contains("selected-nav-btn")) {
        buttonElement.classList.remove("selected-nav-btn");
    } else {
        buttonElement.classList.add("selected-nav-btn");
    }
}

function switchPage(displayMethod) {
    contentDiv.innerHTML = "";
    displayMethod();
}
