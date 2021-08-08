const { Schema, model } = require('mongoose')

// Creating a mongoose shema
const WishListItemSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

//Format to create a mongoose model
const WishListItem = model('wishListItem', WishListItemSchema)

module.exports = WishListItem
