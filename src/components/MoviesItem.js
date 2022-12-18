import React from 'react'

const apiIMG_url="https://image.tmdb.org/t/p/w500";
const MoviesItem = (props) => {
    const {movie,openModal}=props;
  return (


          <div className="card m-2" style={{width:"18rem"}}>
            <h6 className="card-title bg-warning text-dark">IMDb {movie.vote_average}</h6>
  <img src={apiIMG_url+movie.poster_path} className="card-img-top" alt=""/>
  <div className="card-body">
    <h5 className="card-title">{movie.title}</h5>
    <p className="card-text">
    <small className="text-muted">Release on {movie.release_date}</small>
    </p>
    <button onClick={()=>{openModal(movie)}} className="btn btn-dark">View More</button>
  </div>
</div>
  
  )
}

export default MoviesItem
