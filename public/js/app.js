const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// on form submit, run the callback
weatherForm.addEventListener('submit', (e) => {

    // prevent a page refresh
    e.preventDefault();

    // user entered location
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    // use heroku or localhost
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});
