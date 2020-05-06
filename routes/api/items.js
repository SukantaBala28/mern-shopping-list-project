const express = require('express');
const router = express.Router();

//Item Model
const Item = require("../../model/Item");

//Get All Items
router.get('/', (req, res)=>{
    Item.find()
    .sort({date: -1})
    .then(data => {
        return res.status(200).json({data: data});
    })
})

//Create New Items
router.post('/', (req, res)=>{
    const item = Item();
    item.name = req.body.name;
    item.save()
    .then(data => {
        return res.status(200).json({data: data});
    });
})

//Delete New Item
router.delete('/:id', (req, res)=>{
    Item.findByIdAndDelete(req.params.id)
    .then(()=> {
        return res.status(200).json({ data: "Delete Successfull"})
    })
    .catch(err => {
        return res.status(404).json({ data: err})
    })
})



module.exports = router;