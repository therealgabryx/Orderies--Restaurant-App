// WebSocket connection 
var socket = io.connect('http://localhost:3000')

window.onload = () => {
    // db_orderRequest

    /* Ajax GET request */
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let orders = []
            orders = JSON.parse(this.responseText);
            /* console.log(orders) */
            updateView(orders, false);
        }
    };

    request.open('GET', '/db_orders_fetch', true)
    request.send()
}

socket.on('new-order', (data) => {
    updateView(data, true);
})

var ordersOnDisplay = 0
var ordersInDB = 0

function updateView(orders, usingSocket) {
    var output = document.getElementById('container')
    var header = document.getElementById('header')

    if (usingSocket) {
        socket.emit('socket-update', 'socket-update, +1')

        header.innerHTML = `<div id="hd-container"><h2 class="display-5">Orders </h1><div id="tot-orders"> <div class="spinner-border text-secondary" role="status">
  <span class="sr-only">Loading...</span>
</div></div></div>`

var nOrders = document.getElementById('tot-orders')

        
            let outstring = '<div class="jumbotron shadow p-3 mb-5 bg-light rounded">'
            outstring += `<h5><strong>Order ID: </strong>${orders[0]._id}</h5>` +
                `<h5><strong>timestamp: </strong> ${orders[0].time} </h5>` +
                '<hr class="my-3">' +
                `<h5><strong>Table </strong>${orders[0].table}</h5> ` +
                '<hr class="my-3">'

            if (orders[0].first.length > 0) {
                outstring += '<ul class="list-group">' +
                    `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>First</strong></li>`
                for (let j = 0; j < orders[0].first.length; j++) {
                    outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[0].first[j].name}
                    <span class="badge badge-primary badge-pill">${orders[0].first[j].quantity}</span></li>`
                }
                outstring += '</ul><br>'
            }

            if (orders[0].second.length > 0) {
                outstring += '<ul class="list-group">' +
                    `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Second</strong></li>`
                for (let j = 0; j < orders[0].second.length; j++) {
                    outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[0].second[j].name}
                    <span class="badge badge-primary badge-pill">${orders[0].second[j].quantity}</span></li>`
                }
                outstring += '</ul><br>'
            }

            if (orders[0].dessert.length > 0) {
                outstring += '<ul class="list-group">' +
                    `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Dessert</strong></li>`
                for (let j = 0; j < orders[0].dessert.length; j++) {
                    outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[0].dessert[j].name}
                    <span class="badge badge-primary badge-pill">${orders[0].dessert[j].quantity}</span></li>`
                }
                outstring += '</ul><br>'
            }

            if (orders[0].drinks.length > 0) {
                outstring += '<ul class="list-group">' +
                    `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Drinks</strong></li>`
                for (let j = 0; j < orders[0].drinks.length; j++) {
                    outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[0].drinks[j].name}
                    <span class="badge badge-primary badge-pill">${orders[0].drinks[j].quantity}</span></li>`
                }
                outstring += '</ul><br>'
            }

            outstring += '</ul><br>' +
                '</div>'

            if (ordersOnDisplay == 0) {
                output.innerHTML = outstring
                ordersOnDisplay++
            } 
            else {
                output.innerHTML += outstring
                ordersOnDisplay++
            }

          /* Ajax GET request */
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let orders = []
            orders = JSON.parse(this.responseText);
            /* console.log(orders) */
            updateNOrders(nOrders, orders.length());
        }
    };

    request.open('GET', '/db_orders_fetch', true)
    request.send()
        

    } else {
        if (orders.length != 0) {

            header.innerHTML = `<div id="hd-container"><h2 class="display-5">Orders (${orders.length})</h1></div>`

            for (let i = 0; i < orders.length; i++) {
                let outstring = '<div class="jumbotron shadow p-3 mb-5 bg-light rounded">'
                outstring += `<h5><strong>Order ID: </strong>${orders[i]._id}</h5>` +
                    `<h5><strong>timestamp: </strong> ${orders[i].time} </h5>` +
                    '<hr class="my-3">' +
                    `<h5><strong>Table </strong>${orders[i].table}</h5> ` +
                    '<hr class="my-3">'

                if (orders[i].first.length > 0) {
                    outstring += '<ul class="list-group">' +
                        `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>First</strong></li>`
                    for (let j = 0; j < orders[i].first.length; j++) {
                        outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[i].first[j].name}
                        <span class="badge badge-primary badge-pill">${orders[i].first[j].quantity}</span></li>`
                    }
                    outstring += '</ul><br>'
                }

                if (orders[i].second.length > 0) {
                    outstring += '<ul class="list-group">' +
                        `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Second</strong></li>`
                    for (let j = 0; j < orders[i].second.length; j++) {
                        outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[i].second[j].name}
                        <span class="badge badge-primary badge-pill">${orders[i].second[j].quantity}</span></li>`
                    }
                    outstring += '</ul><br>'
                }

                if (orders[i].dessert.length > 0) {
                    outstring += '<ul class="list-group">' +
                        `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Dessert</strong></li>`
                    for (let j = 0; j < orders[i].dessert.length; j++) {
                        outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[i].dessert[j].name}
                        <span class="badge badge-primary badge-pill">${orders[i].dessert[j].quantity}</span></li>`
                    }
                    outstring += '</ul><br>'
                }

                if (orders[i].drinks.length > 0) {
                    outstring += '<ul class="list-group">' +
                        `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Drinks</strong></li>`
                    for (let j = 0; j < orders[i].drinks.length; j++) {
                        outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[i].drinks[j].name}
                        <span class="badge badge-primary badge-pill">${orders[i].drinks[j].quantity}</span></li>`
                    }
                    outstring += '</ul><br>'
                }

                outstring += '</ul><br>' +
                    '</div>'

                if (i == 0) {
                    output.innerHTML = outstring
                    ordersOnDisplay++
                } else {
                    output.innerHTML += outstring
                    ordersOnDisplay++
                }
            }
        } else { 
            output.innerHTML = '<div class="alert alert-success" role="alert" style="margin:5%; border-radius:5px;">' +
                '<h4 class="alert-heading"><strong>Well done!</strong></h4>' +
                '<hr>' +
                '<p class="mb-0">All orders have been processed! Go read a book while you wait!</p>' +
                '</div>'
            ordersOnDisplay = 0
        }
        socket.emit('viewing-orders', 'viewing-orders, +1')
    }

}

function updateNOrders(htmlObj, n) {

htmlObj.innerHTML = n

}

window.onunload = () => {
    socket.emit('closing-orders', 'closing-orders, -1')
}

