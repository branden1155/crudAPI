import React, { useEffect,  useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import './moviesStyle.css'

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
    <div className="movie">
      <span className="movieSpecificTitle">{values && values.movieName}</span>
      <div className="movieSpecificHero">
        <div className="movieSpecificInfo">
          <li className="movieLi">
            <div className="movieLiInfo">
              <h1 className="movieInfoTitle">Movie Name:</h1>
              <span className="movieValues">{values && values.movieName}</span>
              <h1 className="movieInfoTitle">Movie Genre:</h1>
              <span className="movieValues">{values && values.movieGenre}</span>
              <h1 className="movieInfoTitle">Movie Rating:</h1>
              <span className="movieValues">{values && values.movieRating}</span>
            </div>
          </li>
          <button className="removeButton" onClick={() => removeMovie()}>Delete Movie</button>
          <div className="movieSpecificLinks">
            <Link className="movieSpecificNavLinks" to="/">Home</Link>
            <Link className="movieSpecificNavLinks" to="/form">Add new Movie</Link>
          </div>
        </div>
        <div>
          <span className="editMovieTitle">Edit Movie</span>
          <form className="formSpecificForm" onSubmit={(e) => handleSubmit(e)}>
            <label>
                Movie Name
                <input className="inputSpecific" type="text" name="movieName" value={values.movieName} onChange={handleInputChanges} ></input>
            </label>
            <label>
                Movie Genre
                <input className="inputSpecific" type="text" name="movieGenre" value={values.movieGenre} onChange={handleInputChanges} ></input>
            </label>
            <label>
                Movie Rating
                <input className="inputSpecific" type="text" name="movieRating" value={values.movieRating} onChange={handleInputChanges} ></input>
            </label>
            <input className="movieSpecificButton" type="submit" value="submit" />
        </form>
      </div>
      </div>
    </div>
  );
}

export default Movies;
