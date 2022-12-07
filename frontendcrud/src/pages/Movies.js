import React, { useEffect,  useState } from "react";
import { Link, useParams, useNavigate, json } from 'react-router-dom';
import '../App.css';

function Movies() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    movieName: '',
    movieGenre: '',
    movieRating: ''
  })

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
          setValues({
            movieName: data.movieName,
            movieGenre: data.movieGenre,
            movieRating: data.movieRating
          })
          
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

  const updateMovie = async () => {
    try {
      await fetch(`${API_BASE}/list/${id}`,{
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then(res => res.json())
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
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMovie();
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>
        <li>
            <h5>{values && values.movieName}</h5>
            <h5>{values && values.movieGenre}</h5>
            <h5>{values && values.movieRating}</h5>
        </li>
        <button onClick={() => removeMovie()}>Delete Movie</button>
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
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/form">Add a Movie!</Link>
      </header>
    </div>
  );
}

export default Movies;
