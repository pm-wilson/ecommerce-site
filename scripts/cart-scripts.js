import { buildCart, updateCartTotal, checkoutCart } from "./siteUtils.js";

const checkoutButton = document.querySelector("#checkout-button");

checkoutButton.addEventListener("click", () => {
    checkoutCart();
})

buildCart();
updateCartTotal();