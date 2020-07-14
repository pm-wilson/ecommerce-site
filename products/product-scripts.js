import productInventory from "./product-inventory.js";
import { buildInventoryElement } from "./product-inventory.js";

function buildProducts() {
    const listArea = document.querySelector("#product-list");

    for (var i = 0; i < productInventory.length; i++) {
        const currentItem = productInventory[i],
        elementToBuild = buildInventoryElement(currentItem);

        listArea.append(elementToBuild);
    }

}

buildProducts();