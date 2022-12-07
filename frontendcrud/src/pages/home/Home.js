import React from "react";
import { Link } from 'react-router-dom';
import './homeStyle.css'

function Home() {
  return (
    <div className="home">
      <span className="title">Your Movie List!</span>
      <div className="homeHero">
        <div>
          <ul className="links">
            <Link className="movieList" to="/movies">Movie List</Link>
            <Link className="form" to="/form">Add a Movie</Link>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Home;
