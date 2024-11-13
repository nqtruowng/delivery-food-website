import fs from 'fs'

import foodModel from "../models/foodModel.js";

const addFood = async (req, res) => {
    const imageFileName = `${req.file.filename}`
    const createAt = new Date(Date.now())

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: imageFileName,
        createAt: createAt
    })

    try {
        await food.save()
        res.json({success: true, message: 'Food added'})
    } catch (e) {
        console.log(e)
        res.json({success: false, message: 'Error'})        
    }
}

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({success: true, data: foods})
    } catch(e) {
        console.log(e)
        res.json({success: false, message: 'error'})
    }
}

const removeFood =  async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id)
        fs.unlink(`uploads/${food.image}`, () => {})
        await foodModel.findByIdAndDelete(req.params.id)
        res.json({success: true, message: 'food removed'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'error'})
    }
}

const updatePrice = async (req, res) => {
    const { newPrice } = req.body
    const id = req.params.id
    try {
        const foods = await foodModel.findByIdAndUpdate(id, {price: newPrice})
        res.json({success: true, data: foods})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'error'})
    }
}

export { addFood, listFood, removeFood, updatePrice }
