import {buildCartRow, cartData} from "./cartUtils.js";
import {productInventory} from "../products/product-inventory.js";

function buildCart() {
    const cartArea = document.querySelector("#shopping-cart-area");
    
    for (let i = 0; i < cartData.length; i++) {
        const currentCartItem = cartData[i],
        currentCartRow = buildCartRow(currentCartItem.id, productInventory);
        
        cartArea.append(currentCartRow);
    }
}

buildCart();