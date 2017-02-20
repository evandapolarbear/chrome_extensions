console.log("upper fuck");

// chrome.tabs.onCreated.addListener(tab => {
//   var options = {
//     methods: "GET"
//   }
//
//   console.log("fuckkkk");
//
//   fetch('https://jsonplaceholder.typicode.com').then(
//     function(response) {
//       var body = document.getElementById('body');
//
//       if(response.status !== 200) {
//         body.setInnerHTML = "There was a problem, status code: "+ response.status;
//       } else {
//         response.json().then(data => {
//           console.log(data);
//         });
//       }
//     }
//   )
// });

fetch('https://jsonplaceholder.typicode.com').then(
    function(response) {
      var body = document.getElementById('body');

      if(response.status !== 200) {
        body.setInnerHTML = "There was a problem, status code: "+ response.status;
      } else {
        response.json().then(data => {
          console.log(data);
      });
    }
  }
)
