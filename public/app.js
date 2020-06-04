// Make connection 
var socket = io.connect('http://localhost:3000')

window.onload = () => {
    scrollToTop()
}

function scrollToTop() {
        window.scroll({
        top: 0,
        left: 0,
        behavior: 'auto'
    });
}

var order = {
    _id: "",
    time: "",
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
            display('second')
            break;
        case 'second':
            order.second = []
            storeData(5, selector);
            display('dessert')
            break;
        case 'dessert':
            order.dessert = []
            storeData(5, selector);
            display('drinks')
            break;
        case 'drinks':
            order.drinks = []
            storeData(6, selector);
            display('table')
            break;
    }
}

function storeData(n, selector) {
    for (let i = 0; i < n; i++) {
        let num = document.getElementById(`${selector}-selection${i + 1}`).innerText
        if (!isNaN(num)) { //if it's a number...
            let dish = {
                name: '',
                quantity: 0
            }
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

function display(selector) {
    switch (selector) {
        case 'second':
            displaySecond();
            break;
        case 'dessert':
            displayDessert();
            break;
        case 'drinks':
            displayDrinks();
            break;
        case 'table':
            displayTable();
            break;
        case 'placed':
            displayPlaced();
            break;
    }
}

//generates random id;
let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// after this ^^
function btnConfirm() {
    scrollToTop()
    var tableNumber = document.getElementById('table-number').value

    if ((tableNumber > 0) && (tableNumber != '')) {
        order.table = tableNumber

        order.time = new Date().toString()
        order._id = guid()

        console.log('Order Data:', order)

        /* Ajax POST request */
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/', true)
        xhttp.setRequestHeader('Content-type', 'application/json')
        xhttp.send(JSON.stringify(order))

        display('placed')
    }
}


// -- * -- * -- * -- //

function displayPlaced() {
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div class="jumbotron jumbotron-fluid" id="header">
    <div class="container">
        <h1 class="display-4">Order Placed</h1>
        <p class="lead">Thanking you in advance for choosing us</p>
    </div>
</div>` + '<div class="alert alert-success" role="alert" style="margin:5%; border-radius:5px; margin-top:15%; margin-bottom:55%;">' +
        '<h4 class="alert-heading"><strong>Success!</strong></h4>' +
        '<hr>' +
        '<p class="mb-0">Your order has been received and it\'s already on your way!</p>' +
        '</div>'
}

function displaySecond() {
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div class="jumbotron jumbotron-fluid" id="header">
    <div class="container">
        <h1 class="display-4">Second dishes</h1>
        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at augue ut nisl pellentesque
            commodo. Praesent ullamcorper felis ut lorem malesuada, eget hendrerit purus facilisis.</p>
    </div>
</div>

<div class="container" id="button">
    <p class="lead" style="text-align: center;">Want to take a look back at the menu?</p>
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="backToMenu()">Click Here</button>
</div>

<div class="container" id="menu-container" style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-evenly;">

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="second-text1">Polpette al sugo</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('second-selection1')">-</button></div>
                    <div><span class="order-quantity" id="second-selection1">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('second-selection1')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="second-text2">Parmigiana di melanzane</h5>
        </div>  
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('second-selection2')">-</button></div>
                    <div><span class="order-quantity" id="second-selection2">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('second-selection2')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="second-text3">Pollo alle mandorle</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('second-selection3')">-</button></div>
                    <div><span class="order-quantity" id="second-selection3">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('second-selection3')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="second-text4">Pollo al curry</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('second-selection4')">-</button></div>
                    <div><span class="order-quantity" id="second-selection4">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('second-selection4')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="second-text5">Brasato al barolo</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('second-selection5')">-</button></div>
                    <div><span class="order-quantity" id="second-selection5">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('second-selection5')">+</button></div>
                </div>
            </li>
        </ul>
    </div>
    
</div>

<div class="container" style="margin-bottom: 10%; margin-top: 10%;">
    <!-- <p class="lead" style="text-align: center;">..</p> -->
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="btnContinue('second')">Continue</button>
</div>`
}

function displayDessert() {
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div class="jumbotron jumbotron-fluid" id="header">
    <div class="container">
        <h1 class="display-4">Desserts</h1>
        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at augue ut nisl pellentesque
            commodo. Praesent ullamcorper felis ut lorem malesuada, eget hendrerit purus facilisis.</p>
    </div>
</div>

<div class="container" id="button">
    <p class="lead" style="text-align: center;">Want to take a look back at the menu?</p>
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="backToMenu()">Click Here</button>
</div>

<div class="container" id="menu-container" style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-evenly;">

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="dessert-text1">Tiramisù</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('dessert-selection1')">-</button></div>
                    <div><span class="order-quantity" id="dessert-selection1">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('dessert-selection1')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="dessert-text2">Crema Catalana</h5>
        </div>  
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('dessert-selection2')">-</button></div>
                    <div><span class="order-quantity" id="dessert-selection2">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('dessert-selection2')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="dessert-text3">Semifreddo al caffè</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('dessert-selection3')">-</button></div>
                    <div><span class="order-quantity" id="dessert-selection3">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('dessert-selection3')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="dessert-text4">Crème caramel</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('dessert-selection4')">-</button></div>
                    <div><span class="order-quantity" id="dessert-selection4">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('dessert-selection4')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="dessert-text5">Panna cotta con fragole</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('dessert-selection5')">-</button></div>
                    <div><span class="order-quantity" id="dessert-selection5">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('dessert-selection5')">+</button></div>
                </div>
            </li>
        </ul>
    </div>
    
    </div>

    <div class="container" style="margin-bottom: 10%; margin-top: 10%;">
        <!-- <p class="lead" style="text-align: center;">..</p> -->
        <button type="button" class="btn btn-primary btn-lg btn-block" onclick="btnContinue('dessert')">Continue</button>
    </div>
`
}

function displayDrinks() {
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div class="jumbotron jumbotron-fluid" id="header">
    <div class="container">
        <h1 class="display-4">Drinks</h1>
        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at augue ut nisl pellentesque
            commodo. Praesent ullamcorper felis ut lorem malesuada, eget hendrerit purus facilisis.</p>
    </div>
</div>

<div class="container" id="button">
    <p class="lead" style="text-align: center;">Want to take a look back at the menu?</p>
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="backToMenu()">Click Here</button>
</div>

<div class="container" id="menu-container" style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-evenly;">

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="drinks-text1">Bionda</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('drinks-selection1')">-</button></div>
                    <div><span class="order-quantity" id="drinks-selection1">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('drinks-selection1')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="drinks-text2">Doppio malto</h5>
        </div>  
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('drinks-selection2')">-</button></div>
                    <div><span class="order-quantity" id="drinks-selection2">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('drinks-selection2')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="drinks-text3">Teroldego</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('drinks-selection3')">-</button></div>
                    <div><span class="order-quantity" id="drinks-selection3">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('drinks-selection3')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="drinks-text4">Pinot Grigio</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('drinks-selection4')">-</button></div>
                    <div><span class="order-quantity" id="drinks-selection4">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('drinks-selection4')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="drinks-text5">Acqua 1/2l</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('drinks-selection5')">-</button></div>
                    <div><span class="order-quantity" id="drinks-selection5">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('drinks-selection5')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="drinks-text6">Analcolici 33cl</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('drinks-selection6')">-</button></div>
                    <div><span class="order-quantity" id="drinks-selection6">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('drinks-selection6')">+</button></div>
                </div>
            </li>
        </ul>
    </div>
</div>
<div class="container" style="margin-bottom: 10%; margin-top: 10%;">
        <button type="button" class="btn btn-primary btn-lg btn-block" onclick="btnContinue('drinks')">Continue</button>
</div>`
}

function displayTable() {
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div class="jumbotron jumbotron-fluid" id="header">
    <div class="container">
        <h1 class="display-4">Table</h1>
        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at augue ut nisl pellentesque
            commodo. Praesent ullamcorper felis ut lorem malesuada, eget hendrerit purus facilisis.</p>
    </div>
</div>
<br>
<div class="container">
    
    <div id="table-selection" style="text-align: center;">
        <label for="table-number">Enter your table's number</label><br>
        <div class="input-group">
            <input type="number" class="form-control" name="table-number" id="table-number">
        </div>
    </div>
    

<div class="container" style="margin-bottom: 10%; margin-top: 10%;">
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="btnConfirm()">Place Order</button>
</div><br><br></div>`
}

function startOrderSelection() {
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div class="jumbotron jumbotron-fluid" id="header">
    <div class="container">
        <h1 class="display-4">First dishes</h1>
        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at augue ut nisl pellentesque
            commodo. Praesent ullamcorper felis ut lorem malesuada, eget hendrerit purus facilisis.</p>
    </div>
</div>

<div class="container" id="button">
    <p class="lead" style="text-align: center;">Want to take a look back at the menu?</p>
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="backToMenu()">Click Here</button>
</div>

<div class="container" id="menu-container" style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-evenly;">

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="first-text1">Pasta alla carbonara</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('first-selection1')">-</button></div>
                    <div><span class="order-quantity" id="first-selection1">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('first-selection1')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="first-text2">Pasta al ragù</h5>
        </div>  
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('first-selection2')">-</button></div>
                    <div><span class="order-quantity" id="first-selection2">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('first-selection2')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="first-text3">Lasagne</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('first-selection3')">-</button></div>
                    <div><span class="order-quantity" id="first-selection3">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('first-selection3')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="first-text4">Tris di canederli</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('first-selection4')">-</button></div>
                    <div><span class="order-quantity" id="first-selection4">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('first-selection4')">+</button></div>
                </div>
            </li>
        </ul>
    </div>

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/imgs/placeholder.PNG" class="card-img-top" alt="placeholder">
        <div class="card-body" style="text-align: center;">
            <h5 class="card-title" style="margin: 0;" id="first-text5">Spätzle</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center;">
                    <div><button type="button" class="order-button btn btn-primary" class="btn-del" onclick="selectionDel('first-selection5')">-</button></div>
                    <div><span class="order-quantity" id="first-selection5">-</span></div>
                    <div><button type="button" class="order-button btn btn-primary" class="btn-add" onclick="selectionAdd('first-selection5')">+</button></div>
                </div>
            </li>
        </ul>
    </div>
    
</div>

<div class="container" style="margin-bottom: 10%; margin-top: 10%;">
    <!-- <p class="lead" style="text-align: center;">..</p> -->
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="btnContinue('first')">Continue</button>
</div>`
}


function backToMenu() {
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div id="menu-container"">
    
    <div class=" jumbotron jumbotron-fluid" id="header">
<div class="container">
    <h1 class="display-4">Our Selection</h1>
    <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at augue ut nisl pellentesque
        commodo. Praesent ullamcorper felis ut lorem malesuada, eget hendrerit purus facilisis.</p>
</div>
</div>

<div class="container" id="button">
<p class="lead" style="text-align: center;">Didn't order anything yet?</p>
<button type="button" class="btn btn-primary btn-lg btn-block" onclick="startOrderSelection()">Click
Here</button>
</div>

<div class="container">
<!-- first dishes -->
<div class="jumbotron">
    <h1 class="display-5">First dishes</h1>
    <hr class="my-4">
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div class="list-item">
                    <div>Pasta alla carbonara</div>
                    <div>€ 7,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Pasta al ragù</div>
                    <div>€ 6,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Lasagne</div>
                    <div>€ 7,00</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Tris di canederli</div>
                    <div>€ 5,90</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Spätzle</div>
                    <div>€ 7,50</div>
                </div>
            </li>
        </ul>
    </div>
</div>

<!-- second dishes -->
<div class="jumbotron">
    <h1 class="display-5">Second dishes</h1>
    <hr class="my-4">
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div class="list-item">
                    <div>Polpette al sugo</div>
                    <div>€ 7,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Parmigiana di melanzane</div>
                    <div>€ 6,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Pollo alle mandorle</div>
                    <div>€ 7,00</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Pollo al curry</div>
                    <div>€ 5,90</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Brasato al barolo</div>
                    <div>€ 7,50</div>
                </div>
            </li>
        </ul>
    </div>
</div>

<!-- desserts -->
<div class="jumbotron">
    <h1 class="display-5">Desserts</h1>
    <hr class="my-4">
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div class="list-item">
                    <div>Tiramisù</div>
                    <div>€ 7,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Crema Catalana</div>
                    <div>€ 6,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Semifreddo al caffè</div>
                    <div>€ 7,00</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Crème caramel</div>
                    <div>€ 5,90</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Panna cotta con fragole</div>
                    <div>€ 7,50</div>
                </div>
            </li>
        </ul>
    </div>
</div>

<!-- drinks -->
<div class="jumbotron">
    <h1 class="display-5">Drinks</h1>
    <hr class="my-4">
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" style="background-color: #e9ecef; border: none;">
                <div class="list-item">
                    <div>Birre</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Bionda</div>
                    <div>€ 6,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Doppio malto</div>
                    <div>€ 6,50</div>
                </div>
            </li>
        </ul>
        <br>

        <ul class="list-group list-group-flush">
            <li class="list-group-item" style="background-color: #e9ecef; border: none;">
                <div class="list-item">
                    <div>Vini</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Teroldego</div>
                    <div>€ 6,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Pinot Grigio</div>
                    <div>€ 7,00</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Acqua 1/2l</div>
                    <div>€ 5,90</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Analcolici 33cl</div>
                    <div>€ 7,50</div>
                </div>
            </li>
        </ul>
    </div>
</div>

</div>

<div class="container" style="margin-bottom: 10%;">
<p class="lead" style="text-align: center;">Didn't order anything yet?</p>
<button type="button" class="btn btn-primary btn-lg btn-block" onclick="startOrderSelection()">Click
Here</button>
</div>
</div>`
}
