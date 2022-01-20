import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const userCurentdateEl = document.querySelector('#datetime-picker');
const buttonStartEl = document.querySelector('button[data-start]');
const now = Date.now();

let selectDate = null;
let diff = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (Number(selectedDates[0]) < Number(now)) {
      Notiflix.Notify.success(`Please choose a date in the future`);
      buttonStartEl.setAttribute('disabled', 'disabled');
    } else {
      buttonStartEl.removeAttribute('disabled');
    }
    selectDate = selectedDates[0];
  },
};

flatpickr(userCurentdateEl, options);

buttonStartEl.addEventListener('click', starTimer);

function starTimer() {
  intervalId = setInterval(() => {
    const now = Date.now();
    const diff = selectDate - Number(now);
  
    if (diff <= 0) {
      stop();
      return;
    }

    const { days, hours, minutes, seconds } = getTimeComponents(diff);

    document.querySelector('span[data-days]').textContent = pad(days);
    document.querySelector('span[data-hours]').textContent = pad(hours);
    document.querySelector('span[data-minutes]').textContent = pad(minutes);
    document.querySelector('span[data-seconds]').textContent = pad(seconds);

function getTimeComponents(diff) {
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, 0);
}

}, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}