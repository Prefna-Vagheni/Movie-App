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

fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API}`)
  .then((res) => {
    if (!res.ok) throw new Error('jfdjs');
    return res.json();
  })
  .then((data) => {
    const moviesArray = data.results;
    const releaseDate = moviesArray[0].release_date.slice(0, 4);

    updateUI('details--title', moviesArray[2].title);
    updateUI('rate--movie', `${moviesArray[0].vote_average}`.slice(0, 3));
    updateUI('storyline--paragraph', moviesArray[0].overview);
    updateUI('numbers', moviesArray[0].vote_count);

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
  })
  .catch((err) => console.error(err.message));

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

fetch(`https://www.omdbapi.com/?t=Inception&apikey=${API_KEY}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const htm = `
            <article class="movie--card">
                <figure class="movie--img">
                  <img
                    width="110px"
                    height="40px"
                    src="${data.Poster}"
                    alt="People relaxing together"
                  />
                </figure>
                <p class="movie--progress"></p>
                <h4 class="movie--title">The big bang theory</h4>
                <p class="movie--track opacity--low">Season One - Episode 01</p>
            </article>
        `;
    document
      .querySelector('.currently--watching')
      .insertAdjacentHTML('beforeend', htm);
  });
