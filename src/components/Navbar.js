import React, { useContext, useState } from 'react'
import movieContext from './context/Moviecontext';
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alert';
const Navbar = () => {
  const navigate=useNavigate();
  const {searchMovie,showAlert}=useContext(movieContext);
  const [query ,setQuery]=useState("");
  const onChange =(e)=>{
       setQuery(e.target.value);
  }
  const handelSearch =(e)=>{
    e.preventDefault();
    if(query !==""){
      navigate("/search")
      searchMovie(query)
    }
    else{
      showAlert("Query is empty","danger")
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">MoviesHub</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" name='query' onChange={onChange}  aria-label="Search"/>
        <button className="btn btn-outline-success" onClick={handelSearch} type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
<Alert/>
    </div>
  )
}

export default Navbar
