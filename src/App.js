import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import MovieState from './components/context/MovieState';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import Search from './components/Search';

function App() {
  return (
    <> 
        <MovieState>
        <BrowserRouter>
          <Navbar />
          <Routes>
           <Route exact path="/" element={<Home key={"home"} />} />
            <Route exact path="about/" element={<About key={"about"} />} />
            <Route exact path="search/" element={<Search key={"search"} />} />
          </Routes>
        </BrowserRouter>
        </MovieState>
    </>
  );
}

export default App;
