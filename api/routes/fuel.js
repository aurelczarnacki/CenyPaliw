const express = require("express");
const mongoose = require("mongoose")
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      
      cb(null, new Date().toISOString().replace(":","_").replace(":","_") + file.originalname)
    }
})
function fileFilter (req, file, cb) {
    if(file.mimetype === "image/gif" || file.mimetype == "image/jpeg"){
        cb(null, true)
    }else{
        cb(null, false)
    }
  }
const upload = multer({ 
    storage:storage,
    limits: {
        fileSize: 2*1024*1024
    },
    fileFilter: fileFilter
})
const router = express.Router();

const Fuel = require("../models/fuel");

router.post("/", upload.single('CityImage'), (req, res, next) => {
    console.log(req.file);
    const fuel = new Fuel({
        _id: new mongoose.Types.ObjectId(),
        Name: req.body.Name,
        Address: req.body.Address,
        Price98: req.body.Price98,
        Price95: req.body.Price95
    })
    fuel.save()
    .then(result => {
        res.status(201).json({
            message: "Dodanie nowych cen",
            info: result
        })
    })
    .catch(err => res.status(500).json({Error: err}))
   
});

router.get("/", (req, res, next) => {
    Fuel.find()
    .then(result => {
        res.status(200).json({
            message: "Lista wszystkich zapisanych cen",
            info: result
        })
    })
    .catch(err => res.status(500).json({Error: err}))
});

router.get("/:fuelId", (req, res, next) => {
    const id = req.params.fuelId
    Fuel.findById(id)
    .then(result => {
        res.status(200).json({
            message: "Szczegóły stacji o id " + id,
            info : result
        })
    })
    .catch(err => res.status(500).json({Error : err}))
})

router.put("/:fuelId", (req, res, next) => {
    const id = req.params.fuelId
    res.status(200).json({message: "Zmiana informacji o stacji o id " + id})
})

router.delete("/:fuelId", (req, res, next) => {
    const id = req.params.fuelId
    res.status(200).json({message: "Usunięcie stacji o id " + id})
})
module.exports = router;