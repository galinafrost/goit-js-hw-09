const NOTIFICATION_DELAY = 1000;
const refs = {
    buttonStartEl: document.querySelector('button[data-start]'),
    buttonStopEl: document.querySelector('button[data-stop]'),
};

let bgColorId = null;

refs.buttonStartEl.addEventListener('click', showBgColor);

function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
          };

function showBgColor () {
    bgColorId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
      }, NOTIFICATION_DELAY);

      refs.buttonStartEl.setAttribute('disabled', 'disabled');
      refs.buttonStartEl.removeAttribute('disabled');

};

refs.buttonStopEl.addEventListener("click", () => {
    clearInterval(bgColorId);
  });