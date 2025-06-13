import { contentDiv } from "./index.js";

let menuDiv;
const menuItems = [];

init();

export default function displayMenuPage() {
    contentDiv.append(menuDiv);
}

function init() {
    menuDiv = document.createElement("div");
    menuDiv.classList.add("menu-div");

    addMenuItem("Hamburger", 12, "1/2 pound Niman Ranch beef");
    addMenuItem("Cheeseburger", 14, "Choice of cheddar, jack, pepper jack, provolone, bleu, feta, gorgonzola or swiss cheese.");
    addMenuItem("Double Cheeseburger", 18, "1 lb. Niman Ranch beef with double cheddar cheese");
    addMenuItem("Bacon Cheeseburger", 16, "Niman Ranch Hickory smoked bacon and cheddar cheese");
    addMenuItem("BnB Cheeseburger", 19, "Topped with cheddar, Hickory smoked bacon, homemade BBQ sauce and onion rings.");
    addMenuItem("Avocado Cheeseburger", 15, "1/2 lb. Niman Ranch beef with avocado and jack cheese");

    createMenuDiv();
}

function createMenuDiv() {
    const menuHeading = document.createElement("h1");
    menuHeading.innerText = "Menu";
    menuHeading.classList.add("menu-heading");
    menuDiv.appendChild(menuHeading);

    menuDiv.appendChild(createMenuGrid());   
}

function createMenuGrid() {
    const menuGrid = document.createElement("div");
    menuGrid.classList.add("menu-grid");

    for(let i = 0; i < menuItems.length; i++) {
        const menuItem = menuItems[i];
        
        const menuCard = document.createElement("div");
        menuCard.classList.add("menu-card");

        const cardRow1 = document.createElement("div");
        cardRow1.classList.add("card-row-1");

        const menuItemName = document.createElement("h2");
        menuItemName.classList.add("menu-item-name");
        menuItemName.innerText = menuItem.name;

        const menuItemPrice = document.createElement("h2");
        menuItemPrice.classList.add("menu-item-price");
        menuItemPrice.innerText = `\$${menuItem.price}`;

        cardRow1.append(menuItemName, menuItemPrice);

        menuCard.appendChild(cardRow1);

        const menuItemDesc = document.createElement("p");
        menuItemDesc.classList.add("menu-item-desc");
        menuItemDesc.innerText = menuItem.description;

        menuCard.appendChild(menuItemDesc);

        menuGrid.appendChild(menuCard);
    }


    return menuGrid;
}

function addMenuItem(name, price, description) {
    menuItems.push(new MenuItem(name, price, description));
}

function MenuItem(name, price, description) {
    if(!new.target) {
        throw new Error("Must use new keyword");
    }

    this.name = name;
    this.price = price;
    this.description = description;
}