/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

const sendButton = document.getElementById('send-button');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');
const typingArea = document.getElementById('typing-area');
const posts = document.getElementById('posts');
const modal = document.getElementById('modal');
const coordsInput = document.getElementById('coords');
let coordinates;

function getDate() {
  const date = new Date();
  const day = date.getDate();
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  function addZero(time) {
    if (time < 10) {
      time = `0${time}`;
    }
    return time;
  }

  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  return `${day} ${month} ${year} г. в ${hours}:${minutes}`;
}

function publish() {
  if (typingArea.value.length > 0) {
    const date = getDate();
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `<div class='post-info post-date'>${date}</div>
    <p class='post-text'>${typingArea.value}</p>
    <div class='post-info post-place'>${coordinates.latitude}, ${coordinates.longitude}</div>`;
    posts.appendChild(post);
    typingArea.value = '';
  }
}

function getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coordinates = {
          latitude: position.coords.latitude.toFixed(3),
          longitude: position.coords.longitude.toFixed(3),
        };
      }, (err) => {
        coordinates = null;
      },
    );
  }
}

function getPosition2(e) {
  e.preventDefault();
  const coordsString = coordsInput.value.replace(/\s+/g, '');
  const coordsArray = coordsString.split(',');
  coordinates = {
    latitude: coordsArray[0],
    longitude: coordsArray[1],
  };
  modal.classList.remove('modal-active');
  publish();
}

function checkPosition() {
  if (coordinates !== null) {
    publish();
  } else {
    modal.classList.add('modal-active');
  }
}

sendButton.addEventListener('click', checkPosition);
document.addEventListener('DOMContentLoaded', getPosition);

saveButton.addEventListener('click', getPosition2);
cancelButton.addEventListener('click', () => {
  modal.classList.remove('modal-active');
});
