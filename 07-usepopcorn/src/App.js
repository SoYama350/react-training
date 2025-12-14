import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const Key = "7295d89d";
const average = (arr) =>
arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState("");
  const [query, setQuery] = useState("inception");
  const [selectedId, setSelectedId] = useState(null);

  
  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId) ? null : id);
  }

  function handleonCloseMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }
  useEffect(function () {

    async function fetcher() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`https://www.omdbapi.com/?apikey=${Key}&s=${query}`);

        if (!res.ok)
          throw new Error("something wrong with fetching movies!!!")

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search || []);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
  }

    if (query.length < 3 ) {
      setError("");
      setMovies([]);
      return
    }
      
    fetcher();
}, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {IsLoading && <Loader />}
          {!IsLoading && !Error && <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />}
          {Error && <ErrorMsg message={Error} />}
          
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleonCloseMovie}
              onAddWatched={handleAddWatched} />)
            :
            (
            <>
              <MovieSummary watched={watched} />
              <WatchedMovieList watched={watched} />
              </>
            )
          }
        </Box>
      </Main> 
    </>
  );
}

function NavBar({children}) {
  return (
          <nav className="nav-bar">
            {children}
          </nav>
  )
}

function Logo() {
  return (
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
  );
}

function SearchBar({query , setQuery}) {

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResult({movies}) {
  return (
        <p className="num-results">
      Found <strong>{movies?.length ?? 0}</strong> results
        </p>
  );
}


function Loader() {
  return (
    <p className="loader">
      <span>🌎</span> loading ....
    </p>
  )
}

function ErrorMsg({message}) {
  return (
    <p className="error">
      <span>❌</span> {message}
    </p>
  )
}


function MovieDetails({ selectedId, onCloseMovie , onAddWatched}) {
  const [movie, setMovie] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  
  const { 
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre 
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      runtime:Number(runtime.split(" ").at(0)),
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(function () {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(`https://www.omdbapi.com/?apikey=${Key}&i=${selectedId}`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  return <div className="details">
    {isLoading ? <Loader />
      :
      <>
        <header>
          <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
          <img src={poster} alt={`Poster of ${movie} movie`} />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>{released} &ball; {runtime}</p>
            <p>{genre}</p>
            <p>
              <span>⭐{imdbRating} IMDB rating</span>
            </p>
          </div>
        </header>

        <section>
          <div className="rating">
            <StarRating maxRating={10} size="24" onSetRating={setUserRating}/>
            {userRating > 0 &&
              <button className="btn-add" onClick={handleAdd}>
                + add to list
              </button>}
          </div>
          <p><em>{plot}</em></p>
          <p>Starring{actors}</p>
          <p>Directed by {director} </p>
        </section>
      </>
    }
  </div>;
}

function Main({children}) {
  return (
    <main className="main">
        {children}
      </main>
  )
}

function Box({children}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>
          {isOpen && children}
        </div>
  )
}

function MovieList({ movies , onSelectMovie}) {
  return (
    <ul className="list">
      {movies?.map((movie) => (<Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />))}
    </ul>
  );
}

function Movie({movie , onSelectMovie}) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

/*


function WatchedMovieList() {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
            <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <>

            </>
          )}
        </div>
  )
}
*/


function MovieSummary({watched}) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({watched}) {
  return (
    <ul className="list">
      {watched.map((movie) => (<WatchedMovie movie={movie} key={movie.imdbID} />))}
    </ul>);
}

function WatchedMovie({movie}) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}



