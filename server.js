if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/* ExpressJs */
const express = require('express');
const { request, response } = require('express');
const port = 3000;

var app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/', (request, response) => {
    console.log('POST successful:\n', request.body);
});

app.listen(port, () => {
    console.log('Server started on port http://localhost:3000');
});