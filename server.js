 if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

var express = require('express') 
const { request, response } = require('express')

var app = express() 
app.use(express.json())
app.use(express.static('public')) 

app.post('/', (request, response) => {
    console.log('POST successful:\n', request.body)
})

app.listen(3000, () => {
    console.log('Server started on port http://localhost:3000')
}) 
