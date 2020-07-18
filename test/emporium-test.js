// IMPORT MODULES under test here:
import { productInventory } from '../scripts/product-inventory.js';
import { getObjectWithIdFromArray, buildCartRow, calcLineItem, convertNumberToPrice, buildInventoryElement } from '../scripts/siteUtils.js';

const test = QUnit.test;

test('tests if the correct element gets built given a object for product list', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = '<div class="car-inventory-item"><h4 class="car-inventory-name">Acura NSX</h4><span>Category: cars</span><h5 class="car-inventory-price">$500.00</h5><p class="car-inventory-description">Acuras most fancy sports car. Take this for a joy ride today.</p><img class="car-inventory-image" src="product-photos/Acura-NSX.jpeg"><select class="quantity-increase-dropdown" id="quantity-increase-acura-nsx" name="select"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><button class="car-inventory-add-button" value="acura-nsx">Add</button></div>';

    const initial = {
        id: 'acura-nsx',
        name: 'Acura NSX',
        image: 'product-photos/Acura-NSX.jpeg',
        description: 'Acuras most fancy sports car. Take this for a joy ride today.',
        category: 'cars',
        price: 500.00
    };

    //Act 
    // Call the function you're testing and set the result to a const
    const actual = buildInventoryElement(initial),
        actualString = actual.outerHTML;

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.deepEqual(actualString, expected);
});


test('tests if correct object off product inventory is returned with a given id', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = {
        id: 'acura-nsx-45613862',
        name: 'Acura NSX',
        image: 'assets/product-photos/Acura-NSX.jpeg',
        description: 'Acuras most fancy sports car. Take this for a joy ride today.',
        category: 'cars',
        price: 500.00
    };

    //Act 
    // Call the function you're testing and set the result to a const
    const actual = getObjectWithIdFromArray('acura-nsx-45613862', productInventory);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.deepEqual(actual, expected);
});

test('tests if the a number is correctly converted to price', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = '$10.00';
    const expected2 = '$9.99';

    const initial = 10;
    const initial2 = 9.99;

    //Act 
    // Call the function you're testing and set the result to a const
    const actual = convertNumberToPrice(initial);
    const actual2 = convertNumberToPrice(initial2);


    //Expect
    // Make assertions about what is expected versus the actual result
    expect.deepEqual(actual, expected);
    expect.equal(actual2, expected2);
});

test('tests if calcLineItem takes in a price and quantity and returns the product', (expect) => {
    //Arrange
    // Set up your arguments and expectations

    const initialPrice = 0.25,
        initialQuantity = 10,
        expected = 2.5;

    const initialPrice2 = 15,
        initialQuantity2 = 99,
        expected2 = 1485;

    const initialPrice3 = 0.2,
        initialQuantity3 = 0.1,
        expected3 = 0.02;

    //Act 
    // Call the function you're testing and set the result to a const
    const actual = calcLineItem(initialPrice, initialQuantity);
    const actual2 = calcLineItem(initialPrice2, initialQuantity2);
    const actual3 = calcLineItem(initialPrice3, initialQuantity3);


    //Expect
    // Make assertions about what is expected versus the actual result
    expect.deepEqual(actual, expected);
    expect.deepEqual(actual2, expected2);
    expect.deepEqual(actual3, expected3);
});
