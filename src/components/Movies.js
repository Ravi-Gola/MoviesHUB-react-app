import React, { useContext, useEffect, useRef, useState } from "react";
import MoviesItem from "./MoviesItem";
import movieContext from "./context/Moviecontext";
const apiIMG_url = "https://image.tmdb.org/t/p/w500";
const Movies = (props) => {
  const {path}=props;
  const {movies,fetchMovies,totalPages,page,Pre,next,showAlert} = useContext(movieContext)
  const [movie, setMovie] = useState({homepage:"",revenue:"",production_countries:[],production_companies:[],budget:"",tagline:"",original_language:"",status:"",genres:[],release_date:"",overview:"",poster_path:"",title:""});
  const refOpen = useRef(null);
  const refClose = useRef(null);

  const fetchMovieDetails = (id)=>{
   try {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6d0a5b9c041194e044214021e91bd676&language=en-US`)
    .then((res) => res.json())
    .then((data) => {
      setMovie(data);
    });
   } catch (error) {
    console.log(error)
    showAlert("something wrong..","danger")
   }
  }
  useEffect(() => {
      if(path !== "search"){
        fetchMovies();
      }  
    // eslint-disable-next-line
  }, []);
  const openModal = (Movie) => {
    refOpen.current.click();
    fetchMovieDetails(Movie.id);
  };
 
  return (
    <div className="container">
      {/* modal for update note */}
      <button
        type="button"
        style={{ display: "none" }}
        ref={refOpen}
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-light">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Movie Details:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div className="modal-body bg-dark">
              <div className="card mb-3">
              <img src={apiIMG_url+movie.poster_path} className="card-img-top" alt=""/>
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    {movie.overview}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Release date {movie.release_date}</small>
                  </p>
                  <div>
                    <p className="m-0" style={{textAlign:"initial"}}><b>Status :</b><span className="text-warning m-0">{movie.status}</span></p>
                    <p className="m-0" style={{textAlign:"initial"}}><b>Genres :</b> {movie.genres.map((e)=><span className="text-warning m-0">{e.name} , </span>)}</p>
                    <p className="m-0" style={{textAlign:"initial"}}><b>Language :</b><span className="text-warning m-0">{movie.original_language}</span></p>
                    <p className="m-0" style={{textAlign:"initial"}}><b>Tagline :</b><span className="text-warning m-0">{movie.tagline}</span></p>
                    <p className="m-0" style={{textAlign:"initial"}}><b>Budget :</b><span className="text-warning m-0">{movie.budget}</span></p>
                    <p className="m-0" style={{textAlign:"initial"}}><b>Production Companies :</b> {movie.production_companies.map((e)=><span className="text-warning m-0">{e.name} , </span>)}</p>
                    <p className="m-0" style={{textAlign:"initial"}}><b>Production Countries :</b> {movie.production_countries.map((e)=><span className="text-warning m-0">{e.name} , </span>)}</p>
                    <p className="m-0" style={{textAlign:"initial"}}><b>Revenue :</b><span className="text-warning m-0">{movie.revenue}</span></p>
                    <p className="m-0" style={{textAlign:"initial"}}><b>Homepage :</b><span className="text-primary m-0">{movie.homepage}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex flex-wrap justify-content-center">
        {movies.map((element) => {
          return (
            <MoviesItem
              key={element.id}
              movie={element}
              openModal={openModal}
            />
          );
        })}
      </div>
      <div className='d-flex justify-content-center'>
  <ul className="pagination">
    <li className="page-item"><button className="page-link" onClick={Pre} >Previous</button></li>
    <li className="page-item"><button className="page-link" onClick={next} >next</button></li>
    <li className="page-item"><button className="page-link" >{page}</button></li>
    <li className="page-item"><button className="page-link" >.....</button></li>
    <li className="page-item"><button className="page-link" >{totalPages}</button></li>
  </ul>
  </div>
    </div>
  );
};

export default Movies;
