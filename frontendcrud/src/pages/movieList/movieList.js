import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './movieListStyle.css'

function Dashboard() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

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
    <div className="movieListContainer">
      <span className="movieListTitle">Movies List:</span>
      <div className="movieListHero">
        <div className="moviesContainer">
          <ul className="grid">
            {
              movies && movies.map(movie =>(
                <li key={movie._id}>
                  <Link className="movieButton" to={`/movies/${movie._id}`}><button>{movie.movieName}</button></Link>
                </li>
              ))  
            }
        </ul>
        <div className="movieNavButtons">
            <Link className="movieListLinks" to="/">Home</Link>
            <Link className="movieListLinks" to="/form">Add a Movie</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
