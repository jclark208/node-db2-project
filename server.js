const express = require('express');

const knex = require('knex');

const knexfile = require('./knexfile');

const db = knex(knexfile.development);

const server = express();
server.use(express.json());


//get

server.get('/', (req,res) => {
    db('cars')
    .then( cars => {
        res.status(200).json(cars)
    })
    .catch( err => {
        res.status(500).json({error: err.message})
    })
})
//get by id

server.get('/:id',(req,res)=>{
    db('cars')
    .where({id: req.params.id})
    .then( cars => {
        res.status(200).json(cars)
    })
    .catch( err => {
        res.status(500).json({error: err.message})
    })
})

//post

server.post('/',(req,res)=>{
    db('cars')
    .insert(req.body)
    .then(cars => {
        res.status(200).json(cars)
    })
    .catch( err => {
        res.status(500).json({error: err.message})
    })
})


//update

server.put('/:id',(req,res)=>{
    db('cars')
    .where({id: req.params.id})
    .update(req.body)
    .then(updatedData => {
        res.status(200).json({message: updatedData})
    })
    .catch( err => {
        res.status(500).json({error: err.message})
    })
})

//delete

server.delete('/:id',(req,res)=>{
    db('cars')
    .where({id: req.params.id})
    .del(req.body)
    .then(deletedData => {
        res.status(200).json({message: deletedData})
    })
    .catch( err => {
        res.status(500).json({error: err.message})
    })
})

module.exports = server;