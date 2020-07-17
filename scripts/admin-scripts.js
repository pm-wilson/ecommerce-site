import { getArrayOfFormData, saveArrayToLocalStorage, getInventory } from "./siteUtils.js";

const adminForm = document.getElementById("admin-form");

adminForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(adminForm),
        objectOfFormData = getArrayOfFormData(formData),
        localStorageArray = getInventory();

    localStorageArray.push(objectOfFormData);
    saveArrayToLocalStorage(localStorageArray);
    window.location = "./products.html";
});