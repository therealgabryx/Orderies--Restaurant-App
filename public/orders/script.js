// WebSocket connection 
var socket = io.connect('http://localhost:3000')

window.onload = () => {
    // db_orderRequest
    scrollToTop()
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

function scrollToTop() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'auto'
    });
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

socket.on('new-order', (data) => {
    updateView(data, true);
})

var ordersOnDisplay = 0

function updateView(orders, usingSocket) {
    var output = document.getElementById('container')
    var header = document.getElementById('header')

    if (usingSocket) {
        socket.emit('socket-update', 'socket-update, +1')

        header.innerHTML = `<div id="hd-container" style="display:flex; align-items:center"><h2 class="display-5"style="padding-right:5%">Ordini</h2><span class="spinner-border spinner-border-sm text-secondary" style="" role="status" aria-hidden="true"><span class="sr-only">Loading...</span></span></div>`

        let outstring = '<div class="jumbotron shadow p-3 mb-5 bg-light rounded">'
        outstring += `<h5><strong>ID Ordine: </strong>${orders[0]._id}</h5>` +
            `<h5><strong>Orario: </strong> ${orders[0].time} </h5>` +
            `<h5><strong>Tavolo </strong>${orders[0].table}</h5> ` +
            '<hr class="my-3">'

        if (orders[0].name != "") {
            outstring += `<h6><strong>Nome: </strong> ${orders[0].name}</h6>` +
                '<hr class="my-3">'
        }

        if (orders[0].details != "") {
            outstring += `<h6><strong>Indicazioni Aggiuntive<br></strong>${orders[0].details}</h6> ` +
                '<hr class="my-3">'
        }

        if (orders[0].first.length > 0) {
            outstring += '<ul class="list-group">' +
                `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Primi</strong></li>`
            for (let j = 0; j < orders[0].first.length; j++) {
                outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[0].first[j].name}
                    <span class="badge badge-primary badge-pill">${orders[0].first[j].quantity}</span></li>`
            }
            outstring += '</ul><br>'
        }

        if (orders[0].second.length > 0) {
            outstring += '<ul class="list-group">' +
                `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Secondi</strong></li>`
            for (let j = 0; j < orders[0].second.length; j++) {
                outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[0].second[j].name}
                    <span class="badge badge-primary badge-pill">${orders[0].second[j].quantity}</span></li>`
            }
            outstring += '</ul><br>'
        }

        if (orders[0].dessert.length > 0) {
            outstring += '<ul class="list-group">' +
                `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Dolci</strong></li>`
            for (let j = 0; j < orders[0].dessert.length; j++) {
                outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[0].dessert[j].name}
                    <span class="badge badge-primary badge-pill">${orders[0].dessert[j].quantity}</span></li>`
            }
            outstring += '</ul><br>'
        }

        if (orders[0].drinks.length > 0) {
            outstring += '<ul class="list-group">' +
                `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Bevande</strong></li>`
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
        } else {
            var displayedItems = []
            displayedItems[1] = output.innerHTML
            displayedItems[0] = outstring
            output.innerHTML = displayedItems[0] + displayedItems[1]

            ordersOnDisplay++
        }

        /* Ajax GET request */
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let orders = []
                orders = JSON.parse(this.responseText);
                updateNOrders(header, orders.length);
            }
        };

        request.open('GET', '/db_orders_fetch', true)
        request.send()

    } else {
        if (orders.length != 0) {

            header.innerHTML = `<div id="hd-container"><h2 class="display-5">Ordini (${orders.length})</h1></div>`

            for (let i = orders.length - 1; i >= 0; i--) {
                let outstring = '<div class="jumbotron shadow p-3 mb-5 bg-light rounded">'
                outstring += `<h5><strong>ID Ordine: </strong>${orders[i]._id}</h5>` +
                    `<h5><strong>Orario: </strong> ${orders[i].time} </h5>` +
                    `<h5><strong>Tavolo </strong>${orders[i].table}</h5> ` +
                    '<hr class="my-3">'

                if (orders[i].name != "") {
                    outstring += `<h6><strong>Nome: </strong> ${orders[i].name}</h6>` +
                        '<hr class="my-3">'
                }

                if (orders[i].details != "") {
                    outstring += `<h6><strong>Indicazioni Aggiuntive<br></strong>${orders[i].details}</h6> ` +
                        '<hr class="my-3">'
                }

                if (orders[i].first.length > 0) {
                    outstring += '<ul class="list-group">' +
                        `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Primi</strong></li>`
                    for (let j = 0; j < orders[i].first.length; j++) {
                        outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[i].first[j].name}
                        <span class="badge badge-primary badge-pill">${orders[i].first[j].quantity}</span></li>`
                    }
                    outstring += '</ul><br>'
                }

                if (orders[i].second.length > 0) {
                    outstring += '<ul class="list-group">' +
                        `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Secondi</strong></li>`
                    for (let j = 0; j < orders[i].second.length; j++) {
                        outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[i].second[j].name}
                        <span class="badge badge-primary badge-pill">${orders[i].second[j].quantity}</span></li>`
                    }
                    outstring += '</ul><br>'
                }

                if (orders[i].dessert.length > 0) {
                    outstring += '<ul class="list-group">' +
                        `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Dolci</strong></li>`
                    for (let j = 0; j < orders[i].dessert.length; j++) {
                        outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[i].dessert[j].name}
                        <span class="badge badge-primary badge-pill">${orders[i].dessert[j].quantity}</span></li>`
                    }
                    outstring += '</ul><br>'
                }

                if (orders[i].drinks.length > 0) {
                    outstring += '<ul class="list-group">' +
                        `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: #f8f9fa; border: none;"><strong>Bevande</strong></li>`
                    for (let j = 0; j < orders[i].drinks.length; j++) {
                        outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[i].drinks[j].name}
                        <span class="badge badge-primary badge-pill">${orders[i].drinks[j].quantity}</span></li>`
                    }
                    outstring += '</ul><br>'
                }

                outstring += '</ul><br>' +
                    '</div>'

                if (ordersOnDisplay == 0) {
                    output.innerHTML = outstring
                    ordersOnDisplay++
                } else {
                    output.innerHTML += outstring
                    ordersOnDisplay++
                }
            }
        } else {
            output.innerHTML = '<div class="container" style="margin-bottom:130%; margin-top:10%"><div class="alert alert-success" role="alert" style="margin:5%; border-radius:5px;">' +
                '<h4 class="alert-heading"><strong>Ben Fatto!</strong></h4>' +
                '<hr>' +
                '<p class="mb-0">Nessun ordine per ora! Goditi l\'attesa!</p>' +
                '</div></div>'
            ordersOnDisplay = 0
        }
        socket.emit('viewing-orders', 'viewing-orders, +1')
    }

}

function updateNOrders(htmlObj, n) {
    htmlObj.innerHTML = `<div id="hd-container"><h2 class="display-5">Ordini (${n})</h1></div>`
}

window.onunload = () => {
    socket.emit('closing-orders', 'closing-orders, -1')
}