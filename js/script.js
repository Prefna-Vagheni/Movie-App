'use strict';

// require('dotenv').config(); //Loads .env file into process.env

const date = new Date();
const hour = `${date.getHours()}`.padStart(2, 0);
const min = `${date.getMinutes()}`.padStart(2, 0);
const moviesContainer = document.querySelector('.list--container');

document.querySelector('.hour').textContent = hour;
document.querySelector('.min').textContent = min;

const updateUI = function (name, value) {
  document.querySelector(`.${name}`).textContent = value;
};

fetch(`https://www.omdbapi.com/?t=Inception&apikey=${API_KEY}`)
  .then((res) => {
    if (!res.ok) throw new Error('jfdjs');
    return res.json();
  })
  .then((data) => {
    const duration = `${+Math.trunc(
      +data.Runtime.slice(0, 4) / 60 >= 1 ? +data.Runtime.slice(0, 4) / 60 : ''
    )}h ${+data.Runtime.slice(0, 4) % 60}min`;

    console.log(data);
    updateUI('details--title', data.Title);
    updateUI('rate--movie', data.imdbRating);
    updateUI('storyline--paragraph', data.Plot);
    updateUI('numbers', data.imdbVotes.slice(0, 5));
    updateUI('production--brand', data.Production);
    updateUI('movie--duration', duration);
    document.querySelector('.single--image').src = data.Poster;
  })
  .catch((err) => console.error(err.message));
fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API}`)
  .then((res) => res.json())
  .then((data) => {
    const moviesArray = data.results;
    const releaseDate = moviesArray[0].release_date.slice(0, 4);
    moviesArray.forEach((el) => {
      const html = `
          <article class="trending--article">
             <article class="journal">
              <figure>
                <img
                  src="images/couple-watching-streaming-service-together-home.jpg"
                  alt="A couple of people"
                />
              </figure>
            </article>
            <h4 class="trending--title">${el.original_title}</h4>
            <p class="trending--description opacity--low">
              <span class="prod--year">${el.release_date.slice(
                0,
                4
              )}</span>&nbsp;
              <span class="type">Drama</span> &nbsp;
              <span class="movie--duration">1h 30m</span>
            </p>
          </article>
          `;
      moviesContainer.insertAdjacentHTML('beforeend', html);
    });
  });

// for (let num = 1; num <= 20; num++) {
//   fetch(
//     `https://api.themoviedb.org/3/movie/${num}?api_key=${API}&append_to_response=videos,credits`
//   )
//     .then((res) => {
//       if (res.ok) return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       console.log(data.poster_path.slice(1));
//       const htm = `
//             <article class="movie--card">
//                 <figure class="movie--img">
//                   <img
//                     width="110px"
//                     height="40px"
//                     src="images/young-people-relaxing-together.jpg"
//                     alt="People relaxing together"
//                   />
//                 </figure>
//                 <p class="movie--progress"></p>
//                 <h4 class="movie--title">The big bang theory</h4>
//                 <p class="movie--track opacity--low">Season One - Episode 01</p>
//             </article>
//         `;
//       document
//         .querySelector('.currently--watching')
//         .insertAdjacentHTML('beforeend', htm);
//     })
//     .catch((err) => console.error(err));
// }

fetch(`https://api.tvmaze.com/seasons/1/episodes`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach((el, i) => {
      const { name, season, number } = el;
      const { medium } = el.image;

      const htm = `
        <article class="movie--card">
            <figure class="movie--img">
              <img
                width="110px"
                height="40px"
                src="${medium}"
                alt="People relaxing together"
              />
            </figure>
            <p class="movie--progress"></p>
            <h4 class="movie--title">${name}</h4>
            <p class="movie--track opacity--low">Season ${season} - Episode ${number}</p>
        </article>
            `;
      document
        .querySelector('.currently--watching')
        .insertAdjacentHTML('beforeend', htm);
    });
  });

//   Show cast
fetch(`https://api.tvmaze.com/shows/1/cast`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    data.forEach((el, i) => {
      if (i > 3) return;

      const { character } = el;
      const appendHTML = `
        <article class="caracter">
            <figure>
              <img
                src="${character.image.medium}"
                width="55"
                height="55"
                class="caracter--img"
                alt=""
              />
              <figcaption class="caracter--name opacity--low">
                ${character.name}
              </figcaption>
            </figure>
        </article>
              `;
      document
        .querySelector('.actors')
        .insertAdjacentHTML('beforeend', appendHTML);
    });
  });

  .then((res) => res.json())
  .then((data) => console.log(data[0]));

fetch(`https://www.omdbapi.com/?t=Inception&apikey=${API_KEY}`)
  .then((res) => res.json())
  .then((data) => console.log(data));

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API}`)
  .then((res) => res.json())
  .then((data) => console.log(data));
