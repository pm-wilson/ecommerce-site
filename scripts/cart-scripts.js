import { buildCartRow, cartTotalAmount, buildCartTotalRow, getCart } from "./siteUtils.js";
import { productInventory } from "./product-inventory.js";

export function buildCart() {
    const cartArea = document.querySelector("#shopping-cart-area"),
        cartData = getCart(),
        totalAmount = cartTotalAmount(cartData, productInventory);

    for (let i = 0; i < cartData.length; i++) {
        const currentCartItem = cartData[i],
            currentCartRow = buildCartRow(currentCartItem.id, productInventory);

        if (cartArea) {
            cartArea.append(currentCartRow);
        }
    }

    if (cartArea) {
        cartArea.append(buildCartTotalRow(totalAmount));
    }
}

buildCart();

//update cart amount