// external javascript file to execute the PUT request when the button is clicked
app.use(express.static('public')); // built in middleware to make folder public

var update = document.getElementById('update');

update.addEventListener('click', () => {
  // send PUT request
  fetch('jobslist', {
    // fetch takes 2 param. (route) // and optional object that allows you to control different settings
    body: JSON.stringify({
      // body: content you send to the server
      method: 'put', // because sending a put request
      headers: { 'Content-Type': 'application/json' }, // HTTP headers you want to send to the server (object with multiple K-V pairs). Content type = string converted to JSON obj.
      company: 'Test',
      role: 'Test'
    })
  });
});

// easiest way to trigger a PUT request is to use Fetch API
