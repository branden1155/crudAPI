import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../App.css';

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
    <div className="App">
      <header className="App-header">
        <h1>Add a Movie!</h1>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>
                Movie Name
                <input type="text" name="movieName" value={values.movieName} onChange={handleInputChanges} ></input>
            </label>
            <label>
                Movie Genre
                <input type="text" name="movieGenre" value={values.movieGenre} onChange={handleInputChanges} ></input>
            </label>
            <label>
                Movie Rating
                <input type="text" name="movieRating" value={values.movieRating} onChange={handleInputChanges} ></input>
            </label>
            <input type="submit" value="submit" />
        </form>
      </header>
    </div>
  );
}

export default Form;
