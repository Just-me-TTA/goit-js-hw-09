import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const form = document.querySelector('.form');
const btn = document.querySelector('button');
form.addEventListener('submit', startCreate);

async function startCreate(event) {
  event.preventDefault();
  btn.disabled = true;
  let delay = Number(form.elements.delay.value);
  let step = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);

  for (let index = 0; index < amount; index++) {
    let promiseDelay = delay + step * index;
    let position = index + 1;
    try {
      const result = await createPromise(position, promiseDelay);
      Notiflix.Notify.success(`Fulfilled promise ${result.position} in ${result.delay}ms`);
    } catch (error) {
      Notiflix.Notify.failure(`Rejected promise ${error.position} in ${error.delay}ms`);
    }
  }

  btn.disabled = false;
  form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

