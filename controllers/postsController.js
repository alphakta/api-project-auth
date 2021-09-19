const express = require('express')
const router = express.Router()
const ObjectID = require('mongoose').Types.ObjectId

const { PostsModel } = require('../models/postsModel')

// Récupérer les données
router.get('/', (req, res ) => {
    PostsModel.find((err, docs) => {
        if(!err)
            res.send(docs)
        else
            console.log('Error to get data :' + err)
    })
})

// Ajouter les données
router.post('/', (req, res) =>{
    const newRecord = new PostsModel({
        user: req.body.user,
        password: req.body.password,
        mail: req.body.mail,
        imageUrl: req.body.imageUrl
    })

    newRecord.save((err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error creating new data:' + err);
        }
    })
})

// Modifier les données
router.put("/:id",(req, res) =>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('ID unknow: '+ req.params.id)
    }

    const updateRecord = {
        user: req.body.user,
        password: req.body.password,
        mail: req.body.mail,
        imageUrl: req.body.imageUrl
    };

    PostsModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord},
        {new: true},
        (err, docs) =>{
            if(!err){
                res.send(docs)
            }else{
                console.log('Update error: ' + err);
            }
        }
    )
})

// Supprimer les données avec l'id
router.delete('/:id', (req, res) =>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('ID unknow: '+ req.params.id)
    }

    PostsModel.findByIdAndRemove(
        req.params.id,
        (err, docs) =>{
            if(!err){
                res.send(docs)
            } else{
                console.log('Delete error :' + err);
            }
        }
    )
})

module.exports = router