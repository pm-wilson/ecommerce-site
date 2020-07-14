// IMPORT MODULES under test here:
import { buildInventoryElement } from '../products/product-inventory.js';
import { getProductItemWIthId } from '../cart/cartUtils.js';

const test = QUnit.test;

test('tests if the correct element gets built given a object for product list', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = '<div class="car-inventory-item"><h4 class="car-inventory-name">Acura NSX</h4><h5 class="car-inventory-price">$500.00</h5><p class="car-inventory-description">Acuras most fancy sports car. Take this for a joy ride today.</p><img class="car-inventory-image" src="product-photos/Acura-NSX.jpeg"><button class="car-inventory-add-button" value="acura-nsx">Add</button></div>';

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
    const expected = '<div class="car-inventory-item"><h4 class="car-inventory-name">Acura NSX</h4><h5 class="car-inventory-price">$500.00</h5><p class="car-inventory-description">Acuras most fancy sports car. Take this for a joy ride today.</p><img class="car-inventory-image" src="product-photos/Acura-NSX.jpeg"><button class="car-inventory-add-button" value="acura-nsx">Add</button></div>';

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
    expect.equal(actualString, expected);
});

