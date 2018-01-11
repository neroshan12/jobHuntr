// external javascript file to execute the PUT request when the button is clicked

var update = document.getElementById('update');

update.addEventListener('click', () => {
  // send PUT request

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
  var totalJobs = document.getElementsByClassName('jobs').length;
  var latestJob = document.getElementById(totalJobs - 1).innerHTML;
  var latestJobArray = latestJob.trim().split(' ');
  fetch('jobslist', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      company: latestJobArray[0],
      role: latestJobArray[1]
    })
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log(data);
      //  window.location.reload();
    });
});
// easiest way to trigger a PUT request is to use Fetch API
