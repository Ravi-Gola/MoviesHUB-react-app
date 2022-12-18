import MovieContext from "./Moviecontext";
import React ,{useState} from "react";


const MovieState = (props)=>{
   const [page,setPage]=useState(1);
   var api_url =`https://api.themoviedb.org/3/movie/popular?api_key=6d0a5b9c041194e044214021e91bd676&language=en-US&page=${page}`;
   const [movies, setMovies] = useState([]);   
   const [totalPages,setTotal]=useState(0);
   const [display,setdisplay]=useState("none");
   const [alertmsg,setAlertmsg]=useState("");
   const [alerttype,setAlerttype]=useState("");
   //function for show alert
   const showAlert =(msg,type)=>{
     setAlertmsg(msg)
     setAlerttype(type)
     setdisplay("block");
     setTimeout(()=>{
     setdisplay("none")
     },3000)
   }
   const next=(e)=>{
    e.preventDefault();
    setPage(page+1)
     fetchMovies();
  }
  const Pre=(e)=>{
    e.preventDefault();
    if(page>1){
      setPage(page-1);
      fetchMovies();
    }
    else {
      if(page===1){
      fetchMovies();
    }
  }

  }
   const fetchMovies = () => {
   try {
    fetch(api_url)
    .then((res) => res.json())
    .then((data) => {
      setMovies(data.results);
      setTotal(data.total_pages)
    });
    
   } catch (error) {
    console.log(error)
    showAlert("something wrong in fetching movies","danger")
   }
  };

  const searchMovie=async (query)=>{
            try {
                const res= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6d0a5b9c041194e044214021e91bd676&language=en-US&query=${query}&page=1&include_adult=false`);
                const data=await res.json();
                console.log(data)
                if(data.total_results===0){
                    showAlert("Not Found ","danger")
                }else{
                    setMovies(data.results);
                    setTotal(data.total_pages)
                    showAlert("Successfully find your results","success")
                }
            } catch (error) {
              console.log(error)
              showAlert("Something wrong","danger")
            }

  }


    return (
        <MovieContext.Provider value={{api_url,page,setPage,movies,fetchMovies,searchMovie,totalPages,Pre,next,display,alertmsg,alerttype,showAlert}}>
            {props.children}
        </MovieContext.Provider>
    )
}
export default MovieState;