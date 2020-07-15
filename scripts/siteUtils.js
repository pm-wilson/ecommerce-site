export const cartData = [
    { id: 'acura-nsx', quantity: 5 },
    { id: 'ferrari-f8', quantity: 59 },
    { id: 'lamborghini-huracan-evo', quantity: 2 },
    { id: 'rolls-royce-phantom', quantity: 11 },
    { id: 'ford-pinto', quantity: 1 }
];

export function getObjectWithIdFromArray(productId, arrayOfItems) {
    if (arrayOfItems.length > 0) {
        for (var i = 0; i < arrayOfItems.length; i++) {
            const currentInventoryItem = arrayOfItems[i],
                currentInventoryId = currentInventoryItem.id;

            if (currentInventoryId === productId) {
                return currentInventoryItem;
            }
        }
    }
    return null;
}

export function convertNumberToPrice(number) {
    const amount = Math.round(number * 100) / 100,
        textAmount = "$" + amount.toFixed(2);

    return textAmount;
}

export function calcLineItem(price, quantity) {
    const rawTotal = price * quantity;

    return Math.round(rawTotal * 100) / 100;
}

export function buildCartRow(cartObjectId, productItemArray) {
    const cartRow = document.createElement("tr"),
        cartName = document.createElement("td"),
        cartQuantityDown = document.createElement("td"),
        cartQuantityDownButton = document.createElement("button"),
        cartQuantity = document.createElement("td"),
        cartQuantityUp = document.createElement("td"),
        cartQuantityUpButton = document.createElement("button"),
        cartPrice = document.createElement("td"),
        cartTotal = document.createElement("td"),
        cartRemove = document.createElement("td"),
        cartRemoveButton = document.createElement("button"),
        productObject = getObjectWithIdFromArray(cartObjectId, productItemArray),
        cartObject = getObjectWithIdFromArray(cartObjectId, cartData),
        rowTotalPrice = calcLineItem(productObject.price, cartObject.quantity);

    cartRow.classList.add("table-row-cart");

    cartName.classList.add("table-row-name");
    cartName.innerHTML = productObject.name;

    cartQuantityDown.classList.add("table-row-quantity-down");
    cartQuantityDownButton.id = "cart-button-down-" + cartObjectId;
    cartQuantityDownButton.classList.add("cart-button-down");
    cartQuantityDownButton.innerHTML = "-";

    cartQuantity.classList.add("table-row-quantity");
    cartQuantity.innerHTML = cartObject.quantity;

    cartQuantityUp.classList.add("table-row-quantity-up");
    cartQuantityUpButton.id = "cart-button-up-" + cartObjectId;
    cartQuantityUpButton.classList.add("cart-button-up");
    cartQuantityUpButton.innerHTML = "+";

    cartPrice.classList.add("table-row-price");
    cartPrice.innerHTML = convertNumberToPrice(productObject.price);

    cartTotal.classList.add("table-row-total");
    cartTotal.innerHTML = convertNumberToPrice(rowTotalPrice);

    cartRemove.classList.add("table-row-button");
    cartRemoveButton.id = "cart-button-remove-" + cartObjectId;
    cartRemoveButton.classList.add("cart-button-remove");
    cartRemoveButton.innerHTML = "Remove";

    cartQuantityDown.append(cartQuantityDownButton);
    cartQuantityUp.append(cartQuantityUpButton);
    cartRemove.append(cartRemoveButton);
    cartRow.append(cartName, cartQuantityDown, cartQuantity, cartQuantityUp, cartPrice, cartTotal, cartRemove);

    return cartRow;
}

export function cartTotalAmount(cartItemArray, productItemArray) {
    let total = 0,
        printTotal = "";

    for (var i = 0; i < cartItemArray.length; i++) {
        const currentCartItem = cartItemArray[i],
            currentProductItem = getObjectWithIdFromArray(currentCartItem.id, productItemArray),
            cartItemQuantity = currentCartItem.quantity,
            productItemPrice = currentProductItem.price,
            currentTotalPrice = cartItemQuantity * productItemPrice;

        total += currentTotalPrice;
        printTotal = convertNumberToPrice(total)
    }

    return printTotal;
}


export function buildInventoryElement(item) {
    const containerDiv = document.createElement("div"),
        h4Name = document.createElement("h4"),
        h5Price = document.createElement("h5"),
        pDescription = document.createElement("p"),
        imgPicture = document.createElement("img"),
        addButton = document.createElement("button");

    containerDiv.classList.add("car-inventory-item");

    h4Name.classList.add("car-inventory-name");
    h4Name.textContent = item.name;

    h5Price.classList.add("car-inventory-price");
    h5Price.textContent = "$" + item.price.toFixed(2);

    pDescription.classList.add("car-inventory-description");
    pDescription.textContent = item.description;

    imgPicture.classList.add("car-inventory-image");
    imgPicture.src = item.image;

    addButton.classList.add("car-inventory-add-button");
    addButton.textContent = "Add";
    addButton.value = item.id;

    containerDiv.append(h4Name, h5Price, pDescription, imgPicture, addButton);

    return containerDiv;
}
