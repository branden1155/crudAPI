import React, { useEffect,  useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function Movies() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

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
      await fetch(`${API_BASE}/list/${id}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setMovies(data)
          console.log(movies.movieName)
        })
    } catch (error) {
      setError(error.message || "Error")
    } finally {
      setLoading(false)
    }
  }

  const removeMovie = async () => {
    try {
      await fetch(`${API_BASE}/list/${id}`,{
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
            setMovies(data);
          navigate("/dashboard", {replace: true});
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
        <h1>Movies</h1>
        <li>
            <h5>{movies && movies.movieName}</h5>
            <h5>{movies && movies.movieGenre}</h5>
            <h5>{movies && movies.movieRating}</h5>
        </li>
        <button onClick={() => removeMovie}>Delete Movie</button>
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/form">Add a Movie!</Link>
      </header>
    </div>
  );
}

export default Movies;
