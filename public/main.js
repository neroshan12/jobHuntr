// external javascript file to execute the PUT request when the button is clicked
app.use(express.static('public')); // built in middleware to make folder public

var update = document.getElementById('update');

update.addEventListener('click', () => {
  // send PUT request
});

// easiest way to trigger a PUT request is to use Fetch API

