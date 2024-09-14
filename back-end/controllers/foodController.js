import fs from 'fs'

import foodModel from "../models/foodModel";

export const addFood = async (req, res) => {
    let imageFileName = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: imageFileName
    })

    try {
        await food.save()
        res.json({success: true, message: 'Food added'})
    } catch (e) {
        console.log(e)
        res.json({success: false, message: 'Error'})        
    }
}

export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({success: true, data: foods})
    } catch(e) {
        console.log(e)
        res.json({success: false, message: 'error'})
    }
}

export const removeFood =  async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => {})

        await foodModel.findByIdAndDelete
        res.json({success: true, message: 'food removed'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'error'})
    }
}