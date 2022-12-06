import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../App.css';

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
    <div className="App">
      <header className="App-header">
        <h1>Movies List:</h1>
        <Link to="/home">Home</Link>
        <ul>
          {
            movies && movies.map(movie =>(
              <li key={movie._id}>
                <Link to={`/movies/${movie._id}`}>{movie.movieName}</Link>
              </li>
            ))  
          }
        </ul>
      </header>
    </div>
  );
}

export default Dashboard;
