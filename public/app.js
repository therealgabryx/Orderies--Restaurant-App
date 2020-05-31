var order = {
    first: [],
    second: [],
    dessert: [],
    drinks: [],
    table: 0
};

function selectionAdd(selector) {
    var num = document.getElementById(`${selector}`).innerText;

    if (isNaN(num)) {
        document.getElementById(`${selector}`).innerText = 1;
    } else {
        document.getElementById(`${selector}`).innerText = parseInt(num) + 1;
    }
}

function selectionDel(selector) {
    var num = document.getElementById(`${selector}`).innerText;

    if (!isNaN(num)) {
        if (num == 1) {
            document.getElementById(`${selector}`).innerText = '-';
        } else {
            document.getElementById(`${selector}`).innerText = parseInt(num) - 1;
        }
    }
}

function btnContinue(selector) {
    // could be drinks, dessert, second || first

    switch (selector) {
        case 'first':
            order.first = []
            storeData(5, selector);
            break;
        case 'second':
            order.second = []
            storeData(5, selector);
            break;
        case 'dessert':
            order.dessert = []
            storeData(5, selector);
            break;
        case 'drinks':
            order.drinks = []
            storeData(6, selector);
            break;
    }
}

function storeData(n, selector) {
    for (let i = 0; i < n; i++) {
        let num = document.getElementById(`${selector}-selection${i + 1}`).innerText
        if (!isNaN(num)) { //if it's a number...
            let dish = { name: '', quantity: 0 }
            dish.name = document.getElementById(`${selector}-text${i + 1}`).innerText
            dish.quantity = num

            switch (selector) {
                case 'first':
                    order.first.push(dish)
                    break;
                case 'second':
                    order.second.push(dish)
                    break;
                case 'dessert':
                    order.dessert.push(dish)
                    break;
                case 'drinks':
                    order.drinks.push(dish)
                    break;
            }
        }
    }

    console.log('Order Data:', order)

}

// after this ^^
function btnConfirm() {
    var tableNumber = document.getElementById('table-number').value

    if ((tableNumber > 0) && (tableNumber != '')) {
        order.table = tableNumber
        console.log('Order Data:', order)

        /* Ajax POST request */
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/', true)
        xhttp.setRequestHeader('Content-type', 'application/json')
        xhttp.send(JSON.stringify(order))
    }
}