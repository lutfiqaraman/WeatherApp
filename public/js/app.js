const weatherForm = document.querySelector("form");
const searchBox = document.querySelector("input");
const msgOne = document.querySelector("#msg1");
const msgTwo = document.querySelector("#msg2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = searchBox.value;
  msgOne.textContent = "Loading ...";
  msgTwo.textContent = '';

  fetch("/weather?address=" + location)
    .then(response => {
      response.json().then(result => {
        if (result.error) {
            msgOne.textContent = result.error;
        } else {
            msgOne.textContent = result.location;
            msgTwo.innerHTML = result.forecast;
        }
      });
    })
    .catch(error => {
      if (error) {
        msgOne.textContent = error;
      }
    });
});
