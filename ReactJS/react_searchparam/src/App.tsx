import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import Search from './components/Search';

function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
      <Link to="/" style={{ marginRight: '1rem', color: 'white', textDecoration: 'none' }}>Home </Link>
      <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}> |About Us</Link>
      <Link to="/search" style={{ color: 'white', textDecoration: 'none' }}>| Search Param Demo</Link>
    </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/about/:name" element={<Aboutus />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
