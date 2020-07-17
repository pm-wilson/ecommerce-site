import { cart, inventory } from "./constants.js";
import { productInventory } from "./product-inventory.js";

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
    const cartData = getCart(),
        cartRow = document.createElement("tr"),
        cartName = document.createElement("td"),
        cartQuantityDown = document.createElement("td"),
        cartQuantityDownButton = document.createElement("button"),
        cartQuantity = document.createElement("td"),
        cartQuantityUpCount = document.createElement("input"),
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
    cartQuantityDownButton.addEventListener("click", () => {
        subtractCartQuantity(cartObjectId);
        location.reload();
    });

    cartQuantity.classList.add("table-row-quantity");
    cartQuantity.innerHTML = cartObject.quantity;

    cartQuantityUp.classList.add("table-row-quantity-up");

    cartQuantityUpCount.id = "quantity-up-count-" + cartObjectId;
    cartQuantityUpCount.classList.add("quantity-up-count");
    cartQuantityUpCount.type = "number";
    cartQuantityUpCount.min = 1;
    cartQuantityUpCount.value = 1;

    cartQuantityUpButton.id = "cart-button-up-" + cartObjectId;
    cartQuantityUpButton.classList.add("cart-button-up");
    cartQuantityUpButton.innerHTML = "+";
    cartQuantityUpButton.addEventListener("click", () => {
        increaseCartForAmount(cartObjectId);
    });

    cartPrice.classList.add("table-row-price");
    cartPrice.innerHTML = convertNumberToPrice(productObject.price);

    cartTotal.classList.add("table-row-total");
    cartTotal.innerHTML = convertNumberToPrice(rowTotalPrice);

    cartRemove.classList.add("table-row-button");
    cartRemoveButton.id = "cart-button-remove-" + cartObjectId;
    cartRemoveButton.classList.add("cart-button-remove");
    cartRemoveButton.innerHTML = "Remove";
    cartRemoveButton.addEventListener("click", () => {
        removeIdFromCart(cartObjectId);
        location.reload();
    });

    cartQuantityDown.append(cartQuantityDownButton);
    cartQuantityUp.append(cartQuantityUpCount, cartQuantityUpButton);
    cartRemove.append(cartRemoveButton);
    cartRow.append(cartName, cartQuantityDown, cartQuantity, cartQuantityUp, cartPrice, cartTotal, cartRemove);

    return cartRow;
}

function increaseCartForAmount(cartObjectId) {
    const amountToIncreaseArea = document.querySelector("#quantity-up-count-" + cartObjectId),
        amountToIncrease = Number(amountToIncreaseArea.value);

    for (var i = 0; i < amountToIncrease; i++) {
        addItemToCart(cartObjectId);
    }
    location.reload();
}

function removeIdFromCart(cartObjectId) {
    const cart = getCart(),
        newArray = [];

    for (let i = 0; i < cart.length; i++) {
        const currentArrayItem = cart[i];

        if (cartObjectId !== currentArrayItem.id) {
            newArray.push(currentArrayItem);
        }
    }
    saveCart(newArray);
}

function subtractCartQuantity(itemId) {
    const cartArray = getCart(),
        itemInCart = getObjectWithIdFromArray(itemId, cartArray),
        itemQuantity = itemInCart.quantity;

    if (itemQuantity === 1) {
        removeIdFromCart(itemId);
    } else {
        itemInCart.quantity--;
        saveCart(cartArray);
    }
    updateCartTotal();
}

function buildCartTotalRow(totalAmount) {
    const cartRow = document.createElement("tr"),
        cartName = document.createElement("td"),
        cartQuantityDown = document.createElement("td"),
        cartQuantity = document.createElement("td"),
        cartQuantityUp = document.createElement("td"),
        cartPrice = document.createElement("td"),
        cartTotal = document.createElement("td"),
        cartRemove = document.createElement("td"),
        clearButton = document.createElement("button");

    cartRow.classList.add("cart-total-row");
    cartPrice.innerHTML = "Total:";
    cartTotal.innerHTML = totalAmount || "$0.00";

    if (isAmountBiggerThanZero(totalAmount)) {
        clearButton.innerHTML = "Clear Cart";
        clearButton.addEventListener("click", () => {
            clearCart();
            location.reload();
        });
        cartRemove.append(clearButton);
    }

    cartRow.append(cartName, cartQuantityDown, cartQuantity, cartQuantityUp, cartPrice, cartTotal, cartRemove);

    return cartRow;
}

function isAmountBiggerThanZero(amount) {
    const splitString = amount.split("");
    let newString = "";

    for (let i = 1; i < splitString.length; i++) {
        const currentDigit = splitString[i];

        newString += currentDigit;
    }
    newString = Number(newString);
    if (newString > 0) {
        return true;
    }
    return false;
}

function cartTotalAmount(cartItemArray, productItemArray) {
    let total = 0,
        printTotal = "";

    for (let i = 0; i < cartItemArray.length; i++) {
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
        spanCategory = document.createElement("span"),
        h5Price = document.createElement("h5"),
        pDescription = document.createElement("p"),
        imgPicture = document.createElement("img"),
        addButton = document.createElement("button"),
        quantityIncreaseDropdown = document.createElement("select"),
        itemPrice = Number(item.price);

    containerDiv.classList.add("car-inventory-item");

    h4Name.classList.add("car-inventory-name");
    h4Name.textContent = item.name;

    spanCategory.textContent = "Category: " + item.category;

    h5Price.classList.add("car-inventory-price");
    h5Price.textContent = "$" + itemPrice.toFixed(2);

    pDescription.classList.add("car-inventory-description");
    pDescription.textContent = item.description;

    imgPicture.classList.add("car-inventory-image");
    imgPicture.src = item.image;

    quantityIncreaseDropdown.classList.add("quantity-increase-dropdown");
    quantityIncreaseDropdown.id = "quantity-increase-" + item.id;
    quantityIncreaseDropdown.value = 1;
    quantityIncreaseDropdown.name = "select";
    for (let i = 1; i < 10; i++) {
        const selectOption = document.createElement("option");
        selectOption.innerHTML = i;
        selectOption.value = i;

        quantityIncreaseDropdown.append(selectOption);
    }

    addButton.classList.add("car-inventory-add-button");
    addButton.textContent = "Add";
    addButton.value = item.id;
    addButton.addEventListener("click", () => addItemToCart(item.id, quantityIncreaseDropdown.value));

    containerDiv.append(h4Name, spanCategory, h5Price, pDescription, imgPicture, quantityIncreaseDropdown, addButton);

    return containerDiv;
}

function saveCart(arrayOfObjectsToSave) {
    const stringyObject = JSON.stringify(arrayOfObjectsToSave);

    localStorage.setItem(cart, stringyObject);
}

function getCart() {
    const stringyLocalStorage = localStorage.getItem(cart),
        cartArray = JSON.parse(stringyLocalStorage) || [];

    return cartArray;
}

function getCartTotalItems() {
    const cart = getCart();
    let cartCount = 0;

    for (var i = 0; i < cart.length; i++) {
        const currentCartItem = cart[i];

        cartCount += currentCartItem.quantity;
    }

    return cartCount;
}

function clearCart() {
    saveCart([]);
    buildCart();
}

function addItemToCart(itemId, q) {
    const cartArray = getCart(),
        itemInCart = getObjectWithIdFromArray(itemId, cartArray),
        quantityToUpdate = Number(q);

    if (itemInCart) {
        itemInCart.quantity += quantityToUpdate;

    } else {
        cartArray.push({ id: itemId, quantity: quantityToUpdate });
    }

    saveCart(cartArray);
    updateCartTotal();
    animateCartLogo();
}

export function updateCartTotal() {
    const cartTotalLocation = document.querySelector("#cart"),
        totalCartItems = getCartTotalItems();

    if (cartTotalLocation) {
        cartTotalLocation.innerHTML = totalCartItems;
    }
}

export function buildProducts() {
    const listArea = document.querySelector("#product-list"),
        inventory = getInventory();

    for (var i = 0; i < inventory.length; i++) {
        const currentItem = inventory[i],
            currentBuiltItem = buildInventoryElement(currentItem);

        listArea.append(currentBuiltItem);
    }
}

export function buildCart() {
    const cartArea = document.querySelector("#shopping-cart-area"),
        inventory = getInventory(),
        cartData = getCart(),
        totalAmount = cartTotalAmount(cartData, inventory),
        checkoutButton = document.querySelector("#checkout-button");

    for (let i = 0; i < cartData.length; i++) {
        const currentCartItem = cartData[i],
            currentCartRow = buildCartRow(currentCartItem.id, inventory);

        cartArea.append(currentCartRow);
    }
    cartArea.append(buildCartTotalRow(totalAmount));
    if (cartData.length === 0) {
        checkoutButton.disabled = true;
    } else {
        checkoutButton.disabled = false;
    }
}

export function checkoutCart() {
    const cart = getCart();
    let cartText = "Checking out the ",
        inventory = getInventory();

    for (var i = 0; i < cart.length; i++) {
        const currentCartItem = cart[i],
            currentInventoryItem = getObjectWithIdFromArray(currentCartItem.id, inventory);

        cartText += currentInventoryItem.name + " with Quantity (" + currentCartItem.quantity + ")";
        if (i !== cart.length - 1) {
            cartText += ", ";
        }
    }

    alert(cartText);
    clearCart();
    buildCart();
    updateCartTotal();
    location.reload();
}

function animateCartLogo() {
    const cartLogo = document.querySelector("#cart");

    if (cartLogo) {
        cartLogo.classList.add("animate-cart");

        setTimeout(() => cartLogo.classList.remove("animate-cart"), 1000);

    }
}

export function getArrayOfFormData(e) {
    const newId = e.get('id'),
        newName = e.get('name'),
        newImage = e.get('image'),
        newDescription = e.get('description'),
        newCategory = e.get('category'),
        newPrice = e.get('price'),
        itemToAddToInventory = { id: newId, name: newName, image: newImage, description: newDescription, category: newCategory, price: newPrice };

    return itemToAddToInventory
}

export function getArrayOfInventoryFromLocalStorage() {
    const stringifyInventory = localStorage.getItem(inventory),
        inventoryArray = JSON.parse(stringifyInventory);

    return inventoryArray;
}

export function saveArrayToLocalStorage(arrayToSave) {
    const stringifiedArray = JSON.stringify(arrayToSave);

    localStorage.setItem(inventory, stringifiedArray);
}

export function getInventory() {
    const defaultInventory = productInventory,
        storageInventory = getArrayOfInventoryFromLocalStorage();

    if (storageInventory) {
        return storageInventory;
    }
    return defaultInventory;
}