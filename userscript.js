// ==UserScript==
// @name         Shield Daddy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @run-at       document-start
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


function extractDomain(url) {
    var withoutProtocol = url.replace(/^(https?|ftp):\/\//, '');

   // Get the domain and the first level of the TLD
   var domain = withoutProtocol.match(/(?:www\.)?([^/]+)/);

   if (domain) {
       return domain[1];
   } else {
       return null; // Handle cases where the URL format is unexpected
   }
}


(function() {
   'use strict';
   const baseAPIURL = "http://localhost:3000/";
   // Define the URL and request options
   var url = baseAPIURL+'checkWebsite';
   // alert('alive')
   if((localStorage.getItem('userWantedThis84bbns6')) == "heheheha") return;
   if(window.location.href.includes("#userIsZeFsdt=i6895u78u78h")) {
          localStorage.setItem('userWantedThis84bbns6', "heheheha")
       return;
   }
   var options = {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({ url: window.location.href})
   };

   // Send the POST request using the fetch API
   fetch(url, options)
       .then(function(response) {
       if (response.ok) {
           return response.json(); // Parse the response as JSON
       } else {
           alert('failed')
           throw new Error('Request failed');
       }
   })
       .then(function(data) {
       //alert(data.safe)
       if(data.safe) return;
       else {
           if(!data.redirect) return alert("fake!")
            window.location.replace(data.redirect)
       }
   })
       .catch(function(error) {
       // Handle errors here
       console.error(error);
   });

})();