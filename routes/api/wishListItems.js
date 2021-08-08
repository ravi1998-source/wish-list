const { Router } = require('express')
const WishListItem = require('../../models/WishListItems')

const router = Router();


//Requesting data from the server
router.get('/', async (req, res) => {
    try {
        const wishListItems = await WishListItem.find()
        if (!wishListItems) throw new Error('No wishListItems')
        const sorted = wishListItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Submitting data to the server
router.post('/', async (req, res) => {
    const newWishListItem = new WishListItem(req.body)
    try {
        const wishListItem = await newWishListItem.save()
        if (!wishListItem) throw new Error('Something went wrong saving the bucketListItem')
        res.status(200).json(wishListItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//Making changes on an individual data by accessing through an ID
router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await WishListItem.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//Deleting an exsting data 
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await WishListItem.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//module.exports makes sure that a function can be used in another file
module.exports = router
