import React,{useState,useEffect} from 'react'
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

//URL*************************
const base_url = "https://image.tmdb.org/t/p/original/";
//URL**************************

function Row({title,fetchUrl,isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    //useEffect************************
    useEffect(() => {
      async function fetchData(){
          const request = await axios.get(fetchUrl);
         // console.log(request.data.results);
          setMovies(request.data.results);
          return request;
      }fetchData();
    }, [fetchUrl]);
    //useEffect************************

    console.table(movies);
    //opts
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
             //https://developers.google.com/youtube/player_parameters
            autoplay:1,
        },
      }    //opts
    const handleClick = (movie) => {
        if (trailerUrl) {
                 setTrailerUrl('')
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get("v"));
            }).catch(error => console.log(error))
             }
         }
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {/**several row__poster(s) */}
               {movies.map(movie =>(
                   <img
                       key={movie.id}
                       onClick={() => handleClick(movie)}
                       className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                       src={`${base_url}${ isLargeRow ? movie.poster_path: movie.backdrop_path}`} alt={movie.name} />
               ))} 
            </div>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}  
            {/* <img src="https://images.pexels.com/photos/4846347/pexels-photo-4846347.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="test"/>*/}
        </div>
    )
}

export default Row