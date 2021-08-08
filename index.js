const express = require('express') // Handles routes
const app = express();

const mongoose = require('mongoose') // Object Data modelling(OMD) for MongoDB and Node 


const cors = require('cors') // Allows servers to pass information in different domain

const morgan = require('morgan') // A HTTP request logger middleware for NodeJs
const bodyParser = require('body-parser') //Parses incoming request bodies in the middleware

const wishListItemRoutes = require('./routes/api/wishListItems') 
const path = require('path')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose
    .connect('mongodb+srv://ontrack:ontrack@cluster0.04dqa.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('Connected to mongoDb database'))
    .catch((err) => console.log(err))

app.use('/api/wishListItems', wishListItemRoutes)


//Command for deployement
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, () => {
  console.log("Server started on port 3000");
});


