const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');

//connexion data base with server
const mongoURL="mongodb+srv://anwar:anwar@anwar.1vn5dtr.mongodb.net/?retryWrites=true&w=majority"

//parse the data
app.use(express.json())

app.use('/contacts', require('./Routes/contactRoutes'))


mongoose.connect(mongoURL, (err) => {
  err? console.log("error"):console.log(`db runing on port ${port}`)
});

app.listen(port, (err) => {
  err? console.log("error"):console.log(`serveur runing on port ${port}`)
})