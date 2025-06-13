import { contentDiv } from "./index.js";

export default function displayAboutPage() {
    contentDiv.append(aboutDiv);
}

let aboutDiv;
init();

function init() {
    aboutDiv = document.createElement("div");
    aboutDiv.classList.add("about-section");
    populateAboutDiv();
}

function populateAboutDiv() {
    const aboutHeading = document.createElement("h1");
    aboutHeading.classList.add("about-heading");
    aboutHeading.innerText = "About Us";
    
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");

    p1.innerHTML = `
        Welcome to <strong>Grill Theory</strong> – where burgers aren't just food, they're a way of life. 
        Born from a passion for bold flavors and built on a love for the craft of burger-making, 
        we're here to flip the script on your typical burger joint.
    `;

    p2.innerHTML = `
        At Grill Theory, we believe every burger should be a masterpiece. That’s why we use only the 
        freshest, locally sourced ingredients and hand-craft each patty with care. Whether you're craving 
        something classic or feeling adventurous, our menu has something that'll hit the spot – from juicy 
        beef stacks to plant-based creations that pack just as much punch.
    `;

    p3.innerHTML = `
        We’re not fast food. We’re food, made fast – but made right.
    `;

    p4.innerHTML = `
        So come hungry, leave happy, and get ready to taste the theory behind a better burger.
    `;

    aboutDiv.append(aboutHeading, p1, p2, p3, p4);
}
