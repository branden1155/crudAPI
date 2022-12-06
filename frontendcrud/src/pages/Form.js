import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../App.css';

function Form() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const [values, setValues] = useState()
  

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
          console.log(data)
          setMovies(data)
          console.log(movies.map(movies.movieName))
        })
    } catch (error) {
      setError(error.message || "Error")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Add a Movie!</h1>
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <form>
            <label>
                Movie Name
                <input type="text" name="movieName" ></input>
            </label>
            <label>
                Movie Genre
                <input type="text" name="movieName" ></input>
            </label>
            <label>
                Movie Rating
                <input type="text" name="movieName" ></input>
            </label>
            <input type="submit" value="submit" />
        </form>
      </header>
    </div>
  );
}

export default Form;
