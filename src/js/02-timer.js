import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
  clickToClose: true,
});

const btnStartRef = document.querySelector('[data-start]');
btnStartRef.disabled = true;

const dataDaysRef = document.querySelector('[data-days]');
const dataHoursRef = document.querySelector('[data-hours]');
const dataMinRef = document.querySelector('[data-minutes]');
const dataSecRef = document.querySelector('[data-seconds]');
const inputRef = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()){
        Notiflix.Notify.failure("Please choose a date in the future");
    } else {
        btnStartRef.disabled = false;
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);

btnStartRef.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
    inputRef.addEventListener ('click', ()=> {
        clearInterval(intervalId);
        clearTimer();
    },
    {once: true}
    );
   const intervalId = setInterval(() => {
    const ms = calendar.selectedDates[0].getTime() - Date.now();
    if (
        calendar.selectedDates[0].getTime() /1000 === parseInt(Date.now() / 1000)) {
            clearInterval(intervalId);
            Notiflix.Notify.info('Time is out!');
            return;
        }
        updateTimer(convertMs(ms));
   }, 1000);
};

function updateTimer({days, hours, minutes, seconds}) {
    dataDaysRef.textContent = addLeadingZero(days);
    dataHoursRef.textContent = addLeadingZero(hours);
    dataMinRef.textContent = addLeadingZero(minutes);
    dataSecRef.textContent = addLeadingZero(seconds);
};

function clearTimer(){
    dataDaysRef.textContent = '00';
    dataHoursRef.textContent = '00';
    dataMinRef.textContent = '00';
    dataSecRef.textContent = '00';
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
};

