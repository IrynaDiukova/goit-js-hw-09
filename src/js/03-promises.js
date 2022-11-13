import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const firstDelayRef = document.querySelector('input[name="delay"]');
const delayStepRef = document.querySelector('input[name="step"]');
const amountRef = document.querySelector('input[name="amount"]');

formRef.addEventListener('submit', onBtnClick);

function onBtnClick (event){
  event.preventDefault();
  let delayRef = Number(firstDelayRef.value);
  let stepRef = Number(delayStepRef.value);
  for (let i = 1; i <= amountRef.value; i += 1){
    createPromise (i, delayRef)
       .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delayRef += stepRef;
  }
 }


function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    setTimeout (() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve ({position, delay});
        } 
          reject ({position, delay});
        }, delay);
    });
  };
  


