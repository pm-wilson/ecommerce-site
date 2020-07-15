import { productInventory } from "./product-inventory.js";
import { buildInventoryElement, updateCartTotal } from "./siteUtils.js";

function buildProducts() {
    const listArea = document.querySelector("#product-list");

    for (var i = 0; i < productInventory.length; i++) {
        const currentItem = productInventory[i],
            currentBuiltItem = buildInventoryElement(currentItem);

        listArea.append(currentBuiltItem);
    }
}

buildProducts();
updateCartTotal();