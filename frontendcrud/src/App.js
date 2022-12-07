import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';
import Form from './pages/Form'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path='/' exact element={<Home />} />
        <Route path='/movies/:id' exact element={<Movies />} />
        <Route path='form' exact element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
