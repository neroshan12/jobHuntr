// external javascript file to execute the PUT request when the button is clicked

var update = document.getElementById('update');
console.log(3);
update.addEventListener('click', () => {
  // send PUT request
  console.log(4);
  fetch('jobslist', {
    method: 'put', // because sending a put request
    headers: { 'Content-Type': 'application/json' }, // HTTP headers you want to send to the server (object with multiple K-V pairs). Content type = string converted to JSON obj.
    // fetch takes 2 param. (route) // and optional object that allows you to control different settings
    body: JSON.stringify({
      // body: content you send to the server
      company: 'Nero',
      role: 'Test'
    })
  })
    .then(res => {
      console.log('fetch result', res);
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log('data', data);
      //  window.location.reload();
    });
});

var del = document.getElementById('delete');

del.addEventListener('click', function() {
  fetch('jobslist', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      company: 'Test',
      role: 'Test'
    })
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload();
    });
});
// easiest way to trigger a PUT request is to use Fetch API
