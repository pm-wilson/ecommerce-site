import { buildCartRow, cartTotalAmount, buildCartTotalRow, getCart } from "./siteUtils.js";
import { productInventory } from "./product-inventory.js";

function buildCart() {
    const cartArea = document.querySelector("#shopping-cart-area"),
        cartData = getCart(),
        totalAmount = cartTotalAmount(cartData, productInventory);
    console.log('cartdata', cartData)
    for (let i = 0; i < cartData.length; i++) {
        const currentCartItem = cartData[i],
            currentCartRow = buildCartRow(currentCartItem.id, productInventory);

        cartArea.append(currentCartRow);
    }
    //refactor this to conform with cart table
    cartArea.append(buildCartTotalRow(totalAmount));
}

buildCart();