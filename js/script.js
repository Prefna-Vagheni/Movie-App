'use strict';

// require('dotenv').config(); //Loads .env file into process.env

const date = new Date();
const hour = `${date.getHours()}`.padStart(2, 0);
const min = `${date.getMinutes()}`.padStart(2, 0);
const moviesContainer = document.querySelector('.list--container');

document.querySelector('.hour').textContent = hour;
document.querySelector('.min').textContent = min;

fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API}`)
  .then((res) => {
    if (!res.ok) throw new Error('jfdjs');
    console.log(res);
    return res.json();
  })
  .then((data) => {
    const moviesArray = data.results;
    const releaseDate = moviesArray[0].release_date.slice(0, 4);
    document.querySelector('.details--title').textContent =
      moviesArray[0].title;
    document.querySelector('.rate--movie').textContent =
      `${moviesArray[0].vote_average}`.slice(0, 3);
    document.querySelector('.storyline--paragraph').textContent =
      moviesArray[0].overview;
    document.querySelector('.numbers').textContent = moviesArray[0].vote_count;
    console.log(releaseDate);
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
    console.log(moviesArray);
  })
  .catch((err) => console.error(err.message));
