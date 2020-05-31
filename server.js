if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/* MongoDB */
const mongoClient = require('mongodb').MongoClient
const assert = require('assert');

const DBpass = 'ZK5C%24hi6wZA2KkZ' /* 'ZK5C$hi6wZA2KkZ' >> non URL encoded */ /* ::TO-DO:: DB access on clear >> to hide in .env config */
const uri = `mongodb+srv://Gabryx:${DBpass}@datacluster-t5wqs.mongodb.net/test?retryWrites=true&w=majority`

/* ExpressJs */
const express = require('express');
const {
    request,
    response
} = require('express'); // ˋ( ° ▽、° )  DAMMI 15 MIN
const port = 3000; // yyooo ༼ つ ◕_◕ ༽つ a  ahaha okks npnp

var app = express();
app.use(express.json());
app.use(express.static('public'));

/* Starts server on localhost */
app.listen(port, () => {
    console.log('\nServer started on port http://localhost:3000\n');
});

/* Listen for post requests on '/' */
app.post('/', (request, response) => {
    order = JSON.parse(JSON.stringify(request.body))
    console.log('\nPOST successful:\n', order)

    const filter = {};

    /* Database Storing */
    mongoClient.connect(uri, (err, client) => {
        console.log('\nMongoDB connected\n')
        assert.equal(null, err)
        /* const coll = client.db('restaurantApp').collection('db_orders'); */
        client.db('restaurantApp').collection('db_orders').insertOne(order, () => {
            assert.equal(null, err)
            console.log('+ Item Inserted\n')
            client.close();
        })
    });
});

app.get('/orders', (req, res, next) => {

})

/* mongoClient.connect(uri, (err, db) => {
    console.log('\nConnected to datacluster-t5wqs.mongodb.net\n')
    db.close()
}) */