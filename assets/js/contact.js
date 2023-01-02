document.getElementById('contact-form').addEventListener('submit', submitForm)
var input = document.getElementById('phone'),
form = document.querySelector("form"),
result = document.querySelector("#result");

var iti = window.intlTelInput(input, {
initialCountry: "in",
separateDialCode:true,
utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.3/build/js/utils.js",
});

function submitForm(e) {
  e.preventDefault();
  // Get values
  var firstname = getInputVal('name');
  var email = getInputVal('email');
  var phone = iti.getNumber('phone');
  var company = getInputVal('company');
  var message = getInputVal('message');

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "to": "marketing@bizconnectevents.com",
    "subject": `Contacted by ${firstname}`,
    "text": `Name: ${firstname},
             Company Name: ${company},
             Email: ${email},
             Message: ${message},
             Phone: ${phone}
             `,
    "html": `
    <table id="customers" style="font-family: Arial, Helvetica, sans-serif;border-collapse: collapse;width: 100%;">
    <tr>
    <th style="border: 1px solid #ddd;padding: 8px;padding-top: 12px;padding-bottom: 12px;text-align: left;background-color: #F87330;color: white;font-weight:bold;width:30%">Name</th>
    <th style="border: 1px solid #ddd;padding: 8px;padding-top: 12px;padding-bottom: 12px;text-align: left;background-color: #F87330;color: white;font-weight:bold;">Value</th>
  </tr>
    <tr>
      <td style="border: 1px solid #ddd;padding: 8px;font-weight:bold;width:30%">Name</td>
      <td style="border: 1px solid #ddd;padding: 8px;">${firstname}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd;padding: 8px;font-weight:bold;width:30%">Email</td>
      <td style="border: 1px solid #ddd;padding: 8px;">${email}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd;padding: 8px;font-weight:bold;width:30%">Phone Number</td>
      <td style="border: 1px solid #ddd;padding: 8px;">${phone}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd;padding: 8px;font-weight:bold;width:30%">Company Name</td>
      <td style="border: 1px solid #ddd;padding: 8px;">${company}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd;padding: 8px;font-weight:bold;width:30%">Message</td>
      <td style="border: 1px solid #ddd;padding: 8px;">${message}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd;padding: 8px;font-weight:bold;width:30%">Site</td>
      <td style="border: 1px solid #ddd;padding: 8px;"><a href='https://bizconnect.space/'>BizConnect Events - MICE Landing Page</a></td>
    </tr>
  </table>
  
    `
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://asia-south1-biz-contact-form-8001a.cloudfunctions.net/sendMailFromBizConnectMice", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);
  // Clear form
  document.getElementById('contact-form').reset();
  
}

function getInputVal(id) {
  return document.getElementById(id).value;
}
