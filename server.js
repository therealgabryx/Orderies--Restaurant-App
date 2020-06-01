if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/* MongoDB */
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const DBpass =
    'ZK5C%24hi6wZA2KkZ'; /* 'ZK5C$hi6wZA2KkZ' >> non URL encoded */ /* ::TO-DO:: DB access on clear >> to hide in .env config */
const uri = `mongodb+srv://Gabryx:${DBpass}@datacluster-t5wqs.mongodb.net/test?retryWrites=true&w=majority`;

/* Server -- Modules */
const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();

const port = 3000;
const server = app.listen(port, () => {
    console.log('\nServer started on port http://localhost:3000\n');
});

/* static files */
app.use(express.static('public'));

// Socket setup
const io = socket(server);

io.on('connection', (socket) => {
    console.log('Socket connection established, Socket ID:', socket.id);

    /* socket.on('chat', (data) => {
          io.sockets.emit('chat', data) 
      })

      socket.on('typing', (data) => {
          socket.broadcast.emit('typing', data) 
      }) */
});

/* Listen for post requests on '/' */
app.post('/', (req, res) => {
    order = JSON.parse(JSON.stringify(req.body));
    console.log('\nPOST successful:\n', order);

    /* Database Storing */
    mongoClient.connect(
        uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err, client) => {
            console.log('\nMongoDB connected\n');
            assert.equal(null, err);

            const dbOrders = client.db('restaurantApp').collection('db_orders');
            dbOrders.insertOne(order, () => {
                assert.equal(null, err);

                console.log('+ Item Inserted\n');
                client.close();
            });
        }
    );
});

app.get('/orders/', (req, res, next) => {
    // return html of orders
    res.sendFile(path.join(__dirname + '/public/orders/orders.html'), (err) => {
        if (err) {
            next(err);
        } else {
            console.log('Rendered: orders/orders.html');
        }
    });
});

app.get('/db_orders_fetch', (req, res, next) => {
    /* Database Query */

    var orders = []
    mongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
            console.log('\nMongoDB connected\n');
            assert.equal(null, err);

            client.db('restaurantApp').collection('db_orders').find().toArray().then((data) => {
                console.log(data)
                res.send(data)
                client.close();
            });    
    });
});

