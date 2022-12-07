import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './formStyle.css'

function Form() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    movieName: '',
    movieGenre: '',
    movieRating: ''
  })
  

  const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/v1' : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {
    if(!ignore){
      getMovies();
    }

    return () => {
      ignore = true;
    }
  }, [])

  const getMovies = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/list`)
        .then(res => res.json())
        .then(data => {
          setMovies(data)
          
        })
    } catch (error) {
      setError(error.message || "Error")
    } finally {
      setLoading(false)
    }
  }

  const postMovie = async () => {
    try {
      await fetch(`${API_BASE}/list`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(() => getMovies())
    } catch (error) {
      setError(error.message || "Error")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChanges = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postMovie();
    }

  return (
    <div className="formPage">
        <span className="formTitle">Add a Movie!</span>
        <div className="formHero">
          <form className="formField" onSubmit={(e) => handleSubmit(e)}>
              <label className="formLabel">
                   Movie Name
                  <input className="inputField" type="text" name="movieName" placeholder="Movie Name..." value={values.movieName} onChange={handleInputChanges} ></input>
              </label>
              <label className="formLabel">
                  Movie Genre
                  <input className="inputField" type="text" name="movieGenre" placeholder="Movie Genre..." value={values.movieGenre} onChange={handleInputChanges} ></input>
              </label>
              <label className="formLabel">
                  Movie Rating
                  <input className="inputField" type="text" name="movieRating" placeholder="Movie Rating..." value={values.movieRating} onChange={handleInputChanges} ></input>
              </label>
              <input className="formButton" type="submit" value="submit" />
          </form>
          <div className="navButtons">
            <Link className="formLinks" to="/">Home</Link>
            <Link className="formLinks" to="/movies">Movies List</Link>
          </div>
        </div>
    </div>
  );
}

export default Form;
