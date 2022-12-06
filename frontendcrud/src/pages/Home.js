import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies List:</h1>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/form">Add A Movie!</Link>
        <ul>
          <li>Movies</li>
        </ul>
      </header>
    </div>
  );
}

export default Home;
