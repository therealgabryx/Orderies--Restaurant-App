// Make connection 
var socket = io.connect('http://localhost:3000')

window.onload = () => {
    closeNav() 
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
    name: "",
    details: "",
    first: [], 
    second: [],
    dessert: [],
    drinks: [],
    table: 0
}

function toggleNav() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function closeNav() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } 
}

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
    //return id of format 'aaaa'-'aaaaaaaaaaaa'
    return s4() + '-' + s4() + s4() + s4();
}

// after this ^^
function btnConfirm() {
    scrollToTop()
    var tableNumber = document.getElementById('table-number').value
    order.name = document.getElementById('username').value
    order.details = document.getElementById('more-input').value
    
    if ((order.first.length == 0) && (order.second.length == 0) && (order.dessert.length == 0) && (order.drinks.length == 0)) {
        document.getElementById('feedback').innerText = 'L\'ordine non contiene alcun elemento'
        console.log('Order is empty')
    }
    else {
        if ((tableNumber > 0) && (tableNumber != '')) { 
            order.table = tableNumber
    
            order.time = calcDate()
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
}

function calcDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
        dd = `0${dd}`;
    }

    if (mm < 10) {
        mm = `0${mm}`;
    }

    var date = `${dd}-${mm}-${yyyy}`;

    let hours = today.getHours()
    let minutes = today.getMinutes()

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    var time = hours + ":" + minutes + ":" + today.getSeconds();
    var dateTime = date + ' ' + time

    return dateTime
}

function orders() {
    closeNav()
    document.getElementById('hd-logo').innerHTML = `<img src="menu/assets/logos/ord-admin.png " width="150" height="40" style="margin-left: 10%; margin-top: 2%;">`
    document.getElementById('menu-container').innerHTML = `<div class="jumbotron jumbotron-fluid" id="header">
                                                                <div class="container"><h2 class="display-5">Login</h2>
                                                                    <p class="lead">per accedere agli ordini</p>
                                                                </div>    
                                                            </div>
                                                            <div class="container" style="height:65vh">
                                                                <form>
                                                                    <div class="form-group">
                                                                    <label for="username">Username</label>
                                                                    <input type="text" class="form-control" id="username" placeholder="Enter username"> 
                                                                    </div> 
                                                                    <div class="form-group">
                                                                    <label for="password">Password</label>
                                                                    <input type="password" class="form-control" id="password" placeholder="Password">
                                                                    </div>
                                                                    <div id="feedback" style="color: red;">
                                                                    </div>
                                                                    <br>
                                                                    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="checkLogin()">Submit</button>
                                                                </form>  
                                                            </div>`
}

function checkLogin() {
    username = document.getElementById('username')
    password = document.getElementById('password')

    if ((username.value == 'admin') && (password.value == 'admin')) {   
      
        loadOrders()
    } 
    else {
        document.getElementById('feedback').innerText = 'Invalid login.'
    }
} 

function loadOrders() {
    window.location.href = "/orders/"
}


// -- * -- * -- * -- //

function displayPlaced() {
    closeNav()
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div class="jumbotron jumbotron-fluid" id="header">
    <div class="container">
    <h1 class="display-4" style="font-size: 2.7rem;">Ordine Inviato</h1>
        <p class="lead">la ringraziamo per averci scelto</p>
    </div>
</div>` + '<div class="alert alert-success" role="alert" style="margin:5%; border-radius:5px; margin-top:15%; margin-bottom:70%;">' +
        '<h4 class="alert-heading"><strong>Ordine inviato!</strong></h4>' +
        '<hr>' +
        '<p class="mb-0">Il tuo ordine è stato ricevuto e stiamo già iniziando a prepararlo!</p>' +
        '</div>'
}

function displaySecond() {
    closeNav()
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div class="jumbotron jumbotron-fluid" id="header">
    <div class="container">
    <h1 class="display-4" style="font-size: 2.7rem;">Secondi Piatti</h1>
        <p class="lead" style="padding-top: 4%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at augue ut nisl pellentesque
            commodo.</p>
    </div>
</div>

<div class="container" id="button">
    <p class="lead" style="text-align: center;">Vuoi dare un'occhiata al menu?</p>
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="backToMenu()">Clicca Qui</button>
</div>

<div class="container" id="menu-container" style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-evenly;">

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/selection-imgs/seconds/1.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/seconds/2.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/seconds/3.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/seconds/4.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/seconds/5.jpg" class="card-img-top" alt="placeholder">
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
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="btnContinue('second')">Continua</button>
</div>`
}

function displayDessert() {
    closeNav()
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div class="jumbotron jumbotron-fluid" id="header">
    <div class="container">
    <h1 class="display-4" style="font-size: 2.7rem;">Dolci</h1>
        <p class="lead" style="padding-top: 4%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at augue ut nisl pellentesque
            commodo.</p>
    </div>
</div>

<div class="container" id="button">
    <p class="lead" style="text-align: center;">Vuoi dare un'occhiata al menu?</p>
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="backToMenu()">Clicca Qui</button>
</div>

<div class="container" id="menu-container" style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-evenly;">

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/selection-imgs/desserts/1.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/desserts/2.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/desserts/3.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/desserts/4.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/desserts/5.jpg" class="card-img-top" alt="placeholder">
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
        <button type="button" class="btn btn-primary btn-lg btn-block" onclick="btnContinue('dessert')">Continua</button>
    </div>
`
}

function displayDrinks() {
    closeNav()
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div class="jumbotron jumbotron-fluid" id="header">
    <div class="container">
    <h1 class="display-4" style="font-size: 2.7rem;">Bevande</h1>
        <p class="lead" style="padding-top: 4%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at augue ut nisl pellentesque
            commodo.</p>
    </div>
</div>

<div class="container" id="button">
    <p class="lead" style="text-align: center;">Vuoi dare un'occhiata al menu?</p>
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="backToMenu()">Clicca Qui</button>
</div>

<div class="container" id="menu-container" style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-evenly;">

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/selection-imgs/drinks/1.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/drinks/2.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/drinks/3.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/drinks/4.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/drinks/5.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/drinks/6.jpg" class="card-img-top" alt="placeholder">
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
        <button type="button" class="btn btn-primary btn-lg btn-block" onclick="btnContinue('drinks')">Continua</button>
</div>`
}

function displayTable() {
    closeNav()
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div class="jumbotron jumbotron-fluid" id="header">
    <div class="container">
    <h1 class="display-4" style="font-size: 2.7rem;">Dettagli Ordine</h1>
        <p class="lead" style="padding-top: 4%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at augue ut nisl pellentesque
            commodo.</p>
    </div>
</div>
<br>
<div class="container">

    <div style="text-align: center;">
        <label for="username">Inserisci il tuo nome</label><br>
        <div class="input-group">
            <input type="text" style="text-align:center" class="form-control" name="name" id="username" placeholder="Jeff">
        </div>
        <br><br>
    </div>
    
    <div id="table-selection" style="text-align: center;">
        <label for="table-number">Inserisci il numero del tavolo</label><br>
        <div class="input-group">
            <input type="number" style="text-align:center" class="form-control" name="table-number" id="table-number" placeholder="13">
        </div>
        <br><br>
    </div>

    <div style="text-align: center;">
        <label for="more-input">Indicazioni aggiuntive</label><br>
        <div class="input-group">
            <textarea style="text-align:center" class="form-control" name="more-input" rows="2" id="more-input" placeholder=""></textarea>
        </div>   
    </div>
    <br>
    <div id="feedback" style="color: red; text-align: center">
    </div>

<div class="container" style="margin-bottom: 10%; margin-top: 10%;">
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="btnConfirm()">Invia Ordine</button>
</div><br><br></div>`
}

function startOrderSelection() {
    closeNav()
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div class="jumbotron jumbotron-fluid" id="header">
    <div class="container">
        <h1 class="display-4" style="font-size: 2.7rem;">Primi Piatti</h1>
        <p class="lead" style="padding-top: 4%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at augue ut nisl pellentesque
            commodo.</p>
    </div>
</div>

<div class="container" id="button">
    <p class="lead" style="text-align: center;">Vuoi dare un'occhiata al menu?</p>
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="backToMenu()">Clicca Qui</button>
</div>

<div class="container" id="menu-container" style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-evenly;">

    <div class="card" style="width: 18rem; margin-bottom: 5%; margin-right: 2%;">
        <img src="menu/assets/selection-imgs/firsts/1.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/firsts/2.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/firsts/3.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/firsts/4.jpg" class="card-img-top" alt="placeholder">
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
        <img src="menu/assets/selection-imgs/firsts/5.jpg" class="card-img-top" alt="placeholder">
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
    <button type="button" class="btn btn-primary btn-lg btn-block" onclick="btnContinue('first')">Continua</button>
</div>`
}


function backToMenu() {
    closeNav()
    scrollToTop()
    document.getElementById('menu-container').innerHTML = `<div id="menu-container"">
    
    <div class=" jumbotron jumbotron-fluid" id="header">
<div class="container">
    <h1 class="display-4" style="font-size: 2.7rem;">Le nostre proposte</h1>
    <p class="lead" style="padding-top: 4%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nam at augue ut nisl
                    pellentesque
                    commodo. Praesent ullamcorper felis ut lorem malesuada.
                </p>
</div>
</div>

<div class="container" id="button">
<p class="lead" style="text-align: center;">Non hai ancora <strong>ordinato</strong>?</p>
<button type="button" class="btn btn-primary btn-lg btn-block" onclick="startOrderSelection()">Clicca Qui</button>
</div>

<div class="container">
<!-- first dishes -->
<div class="jumbotron">
    <h1 class="display-5">Primi</h1>
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
                    <div>€ 6,90</div>
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
    <h1 class="display-5">Secondi</h1>
    <hr class="my-4">
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div class="list-item">
                    <div>Polpette al sugo</div>
                    <div>€ 8,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Parmigiana di melanzane</div>
                    <div>€ 7,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Pollo alle mandorle</div>
                    <div>€ 6,00</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Pollo al curry</div>
                    <div>€ 6,90</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Brasato al barolo</div>
                    <div>€ 9,50</div>
                </div>
            </li>
        </ul>
    </div>
</div>

<!-- desserts -->
<div class="jumbotron">
    <h1 class="display-5">Dolci</h1>
    <hr class="my-4">
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div class="list-item">
                    <div>Tiramisù</div>
                    <div>€ 3,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Crema Catalana</div>
                    <div>€ 3,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Semifreddo al caffè</div>
                    <div>€ 2,90</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Crème caramel</div>
                    <div>€ 2,90</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Panna cotta con fragole</div>
                    <div>€ 3,50</div>
                </div>
            </li>
        </ul>
    </div>
</div>

<!-- drinks -->
<div class="jumbotron">
    <h1 class="display-5">Bevande</h1>
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
                    <div>€ 1,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Doppio malto</div>
                    <div>€ 1,90</div>
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
                    <div>€ 7,50</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Pinot Grigio</div>
                    <div>€ 10,00</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Acqua 1/2l</div>
                    <div>€ 1,90</div>
                </div>
            </li>

            <li class="list-group-item">
                <div class="list-item">
                    <div>Analcolici 33cl</div>
                    <div>€ 2,50</div>
                </div>
            </li>
        </ul>
    </div>
</div>

</div>

<div class="container" style="margin-bottom: 10%;">
<p class="lead" style="text-align: center;">Non hai ancora <strong>ordinato</strong>?</p>
<button type="button" class="btn btn-primary btn-lg btn-block" onclick="startOrderSelection()">Clicca Qui</button>
</div>
</div>`
}