import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';
//import StarRating from "./StarRating";
import TextExpander from "./textExpander";

/*
function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating onSetRating={setMovieRating} maxRating={8} />
      <p>this movie was rated {movieRating} by imdb</p>
    </div>
  )
}
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<App />
    <StarRating maxRating={5} messages={["horrible" , "bad" , "ok" , "good" , "amazing" ]} defultRating={3} />
    <StarRating maxRating={10} color='red' size='25' />
    <Test />
*/}
    <TextExpander /> 
  </React.StrictMode>
);
