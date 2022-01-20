import Notiflix from 'notiflix';

const userDelayEl = document.querySelector('input[name="delay"]');
const userStepEl = document.querySelector('input[name="step"]');
const userAmountEl = document.querySelector('input[name="amount"]');
const btnCreatePromisesEl = document.querySelector('.submit-js');
const form = document.querySelector('.form');


btnCreatePromisesEl.addEventListener('click', promiseClick);

function promiseClick (event) {
  event.preventDefault();

  let firstDelay = Number(userDelayEl.value);
  let delayStep = Number(userStepEl.value);
  let amount = Number(userAmountEl.value);

for (let i = 1; i <= amount; i+=1) {
  createPromise(i, firstDelay);
  firstDelay += delayStep;
}
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
setTimeout(() => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }, delay)
  });

  promise
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
  });
};

