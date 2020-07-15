import { buildCartRow, cartData, cartTotalAmount } from "./siteUtils.js";
import { productInventory } from "./product-inventory.js";

function buildCart() {
    const cartArea = document.querySelector("#shopping-cart-area"),
        totalText = "Cart Total: " + cartTotalAmount(cartData, productInventory);

    for (let i = 0; i < cartData.length; i++) {
        const currentCartItem = cartData[i],
            currentCartRow = buildCartRow(currentCartItem.id, productInventory);

        cartArea.append(currentCartRow);
    }
    //refactor this to conform with cart table
    cartArea.append(totalText);
}

buildCart();