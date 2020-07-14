const productInventory = [
    {
        id: 'acura-nsx',
        name: 'Acura NSX',
        image: 'product-photos/Acura-NSX.jpeg',
        description: 'Acuras most fancy sports car. Take this for a joy ride today.',
        category: 'cars',
        price: 500.00
    },
    {
        id: 'ferrari-f8',
        name: 'Ferrari F8 Tributo',
        image: 'product-photos/ferrari-f8-tributo.jpg',
        description: 'This wonderful machine is just sitting in a garage, waiting to get out and burn some rubber.',
        category: 'cars',
        price: 800.00
    },
    {
        id: 'ford-pinto',
        name: 'Ford Pinto',
        image: 'product-photos/ford-pinto.jpg',
        description: 'It is a miracle this thing is even driving at all, be the only one in the neighborhood to rock the Pinto!',
        category: 'cars',
        price: 9.99
    },
    {
        id: 'geo-metro',
        name: 'Geo Metro',
        image: 'product-photos/geo-metro.jpg',
        description: 'Not the most fancy ride out there, but great for parking in the city.',
        category: 'cars',
        price: 19.95
    },
    {
        id: 'lamborghini-huracan-evo',
        name: 'Lamborghini Huracan Evo',
        image: 'product-photos/lamborghini-huracan-evo.jpg',
        description: 'A pretty sweet ride if you want to burn rubber on open highways, or roll along the boardwalk',
        category: 'cars',
        price: 900.00
    },
    {
        id: 'rolls-royce-phantom',
        name: 'Rolls Royce Phantom',
        image: 'product-photos/rolls-royce-phantom.jpg',
        description: 'Good enough for royalty, this fine automobile will make you look classy to the max.',
        category: 'cars',
        price: 600.50
    },
    {
        id: 'volvo-740',
        name: 'Volvo 740',
        image: 'product-photos/volvo-740.jpg',
        description: 'Might not look pretty, but this will last forever, well at least until someone else purchases it from us.',
        category: 'cars',
        price: 75.25
    },
];


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

export default productInventory;