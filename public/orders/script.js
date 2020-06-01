// WebSocket connection 
var socket = io.connect('http://localhost:3000') 

window.onload = () => {
    // db_orderRequest

    /* Ajax GET request */
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let orders = []
            orders = JSON.parse(this.responseText);
            /* console.log(orders) */
            updateView(orders); 
        }
    };

    request.open('GET', '/db_orders_fetch', true)
    request.send()
}

function updateView(orders) {
    var output = document.getElementById('container')
    var header = document.getElementById('header')

    if (orders.length != 0) {
        header.innerHTML = `<h3><strong>Orders (${orders.length})</strong></h3>`
        for (let i = 0; i < orders.length; i++) {
            let outstring = '<div class="jumbotron shadow p-3 mb-5 bg-light rounded">'
            outstring += `<h5><strong>Order ID: </strong>${orders[i]._id}</h5>`
                       + `<h5><strong>timestamp: </strong>00-00-00 00:00:00</h5>`
                       + '<hr class="my-3">'
                       + `<h5><strong>Table </strong>${orders[i].table}</h5> `
                       + '<hr class="my-3">'
    
            if (orders[i].first.length > 0) {
                outstring += '<ul class="list-group">'
                + `<li class="list-group-item d-flex justify-content-between align-items-center"><strong>First</strong></li>`
                for (let j = 0; j < orders[i].first.length; j++) {
                    outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[i].first[j].name}
                    <span class="badge badge-primary badge-pill">${orders[i].first[j].quantity}</span></li>`
                }
                outstring += '</ul><br>'
            }
    
            if (orders[i].second.length > 0) {
                outstring += '<ul class="list-group">'
                + `<li class="list-group-item d-flex justify-content-between align-items-center"><strong>Second</strong></li>`
                for (let j = 0; j < orders[i].second.length; j++) {
                    outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[i].second[j].name}
                    <span class="badge badge-primary badge-pill">${orders[i].second[j].quantity}</span></li>`
                }
                outstring += '</ul><br>'
            }
    
            if (orders[i].dessert.length > 0) {
                outstring += '<ul class="list-group">'
                + `<li class="list-group-item d-flex justify-content-between align-items-center"><strong>Dessert</strong></li>`
                for (let j = 0; j < orders[i].dessert.length; j++) {
                    outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[i].dessert[j].name}
                    <span class="badge badge-primary badge-pill">${orders[i].dessert[j].quantity}</span></li>`
                }
                outstring += '</ul><br>'
            }
    
            if (orders[i].drinks.length > 0) {
                outstring += '<ul class="list-group">'
                + `<li class="list-group-item d-flex justify-content-between align-items-center"><strong>Drinks</strong></li>`
                for (let j = 0; j < orders[i].drinks.length; j++) {
                    outstring += `<li class="list-group-item d-flex justify-content-between align-items-center">${orders[i].drinks[j].name}
                    <span class="badge badge-primary badge-pill">${orders[i].drinks[j].quantity}</span></li>`
                }
                outstring += '</ul><br>'
            }
    
            outstring += '</ul><br>'
                      + '</div>'   
            
            if (i == 0) {
                output.innerHTML = outstring
            } else {
                output.innerHTML += outstring
            }
        }
    } else {
        output.innerHTML = '<div class="alert alert-success" role="alert" style="margin:5%; border-radius:5px;">'
        + '<h4 class="alert-heading"><strong>Well done!</strong></h4>'
        + '<hr>'
        + '<p class="mb-0">All orders have been processed! Go read a book while you wait!</p>'
        + '</div>'
    }  
}