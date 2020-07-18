import { getArrayOfFormData, saveArrayToLocalStorage, getInventory } from './siteUtils.js';

const adminButton = document.getElementById('admin-form');

adminButton.addEventListener('submit', (e) => {
    const objectOfFormData = getArrayOfFormData(e),
        localStorageArray = getInventory();

    localStorageArray.push(objectOfFormData);
    saveArrayToLocalStorage(localStorageArray);
    window.location = './products.html';
});