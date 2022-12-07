import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import MoviesList from './pages/movieList/movieList';
import Movies from './pages/movies/Movies';
import Form from './pages/form/Form'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/movies' exact element={<MoviesList />} />
        <Route path='/' exact element={<Home />} />
        <Route path='/movies/:id' exact element={<Movies />} />
        <Route path='form' exact element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
