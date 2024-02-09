import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const button = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let countdownInterval;
let targetDate;
let userSelectedDate;

button.addEventListener("click", startCounter);
button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (selectedDate < Date.now()) {
      iziToast.show({
    message: 'Please choose a date in the future',
    messageColor: 'white',
    backgroundColor: '#e03434',
    position: 'topRight',
    iconColor: 'white',
    close: false,
    displayMode: 1,
    timeout: 3000
});
    } else {
          button.disabled = false;
          userSelectedDate = selectedDate;
    }
  },
};

const datePicker = flatpickr("#datetime-picker", options);

function startCounter() {
    targetDate = datePicker.selectedDates[0];
    // targetDate = userSelectedDate;

    button.disabled = true;
    datePicker.disabled = true;

  const currentDate = Date.now();

  if (targetDate <= currentDate) {
    iziToast.show({
    message: 'Please choose a date in the future',
    messageColor: 'white',
    backgroundColor: '#e03434',
    position: 'topRight',
    iconColor: 'white',
    close: false,
    displayMode: 1,
    timeout: 3000
});
    return;
  }

  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateTimer, 1000);
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
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer() {
  const timeDifference = targetDate - Date.now();
  const time = convertMs(timeDifference);

  daysElement.textContent = addLeadingZero(time.days);
  hoursElement.textContent = addLeadingZero(time.hours);
  minutesElement.textContent = addLeadingZero(time.minutes);
  secondsElement.textContent = addLeadingZero(time.seconds);

  if (timeDifference <= 1000) {
      clearInterval(countdownInterval);
      button.disabled = false;
    datePicker.disabled = false;
  }
}