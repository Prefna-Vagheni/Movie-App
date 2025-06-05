'use strict';

const date = new Date();
const hour = `${date.getHours()}`.padStart(2, 0);
const min = `${date.getMinutes()}`.padStart(2, 0);

document.querySelector('.hour').textContent = hour;
document.querySelector('.min').textContent = min;

fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${APY_KEY}`)
  .then((res) => {
    if (!res.ok) throw new Error('jfdjs');
    console.log(res);
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.error(err.message));
