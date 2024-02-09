import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const inputFulfilled = document.querySelector('input[value="fulfilled"]');
const inputRejected = document.querySelector('input[value="rejected"]');

form.addEventListener("submit", startPromise);

function startPromise(e) {
    e.preventDefault();

    const delay = Number(delayInput.value);
    const state = inputFulfilled.checked ? "fulfilled" : "rejected";

    const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else { 
        reject(delay);
      }
    }, delay);
    });
    
    promise.then(
    (delay) => { 
      iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`,
    messageColor: 'white',
    backgroundColor: '#24d183',
    position: 'topRight',
    iconColor: 'white',
    close: false,
    displayMode: 1,
    timeout: 3000,
});
    },
    (delay) => { 
      iziToast.show({
    message: `❌ Rejected promise in ${delay}ms`,
    messageColor: 'white',
    backgroundColor: '#e03434',
    position: 'topRight',
    iconColor: 'white',
    close: false,
    displayMode: 1,
    timeout: 3000
});
    }
    );
    
    form.reset();
}

