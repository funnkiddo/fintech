const request = require('request');
request('http://localhost:3000', function (error, response, body) {
    //구글이라는 사이트에 요청을 날림 
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
