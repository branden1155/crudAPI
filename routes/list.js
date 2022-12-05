const express = require('express');
const router = express.Router();

const movieList = require('../models/movieList');
// RESTFUL Endpoints
// GET, POST, PATCH, DELETE

const getMovie = async (req, res, next) => {
    let movie
    try{
        movie = await movieList.findById(req.params.id)
        if(movie === null){
            return res.status(404).json({ message: "Movie Not Found"})
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.movie = movie
    next();
} 

//GET ALL
router.get("/", async (req, res) => {
    try{
        const list = await movieList.find()
        res.json(list)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//GET ONE
router.get("/:id", getMovie, async (req, res) => {
    res.json(res.movie)
})

//POST
router.post("/", async (req, res) => {
    const movie = new movieList({
        movieName: req.body.movieName,
        movieGenre: req.body.movieGenre,
        movieRating: req.body.movieRating
    })

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie)
    }catch(error) {
        res.status(400).json({ message: error.message })
    }
})

//PATCH
router.patch("/:id", getMovie, async (req, res) => {
    if(req.body.movieName != null){
        res.movie.movieName = req.body.movieName
    }
    if(req.body.movieGenre != null){
        res.movie.movieGenre = req.body.movieGenre
    }
    if(req.body.movieRating != null){
        res.movie.movieRating = req.body.movieRating
    }
    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    }   catch(error) {
        res.status(400).json({ message: error.message })
    }
})

//DELETE
router.delete("/:id", getMovie, async (req, res) => {
    try {
        await res.movie.remove();
        res.json({message: `Removed Movie`})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router;