'use strict';

const date = new Date();
const hour = date.getHours();
const min = `${date.getMinutes()}`.padStart(2, 0);

document.querySelector('.hour').textContent = hour;
document.querySelector('.min').textContent = min;
