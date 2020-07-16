import { inventory } from "./constants.js";

const adminButton = document.getElementById("admin-form");

adminButton.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("here")
    //window.location = "../products.html";
});

function addInventoryToLocalStorage() {

}
//add current inventory into local storage


console.log("admin page")