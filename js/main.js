var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var tableBody = document.getElementById('tableBody');

var siteContainer ;

if (localStorage.getItem('Sites') != null) {
  siteContainer =  JSON.parse(localStorage.getItem('Sites'));
  displaySites(siteContainer);
}else{
  siteContainer = [];
}

function addSite() {
  if (validSite(siteURL.value)) {
    
  var site = {
    siteName : siteName.value,
    siteURL : siteURL.value
  }

  siteContainer.push(site);
  localStorage.setItem('Sites' , JSON.stringify(siteContainer))
  clearForm();
  displaySites(siteContainer);
  }else{
    alert('URL is not a valid must write www first ')
  }
}

function clearForm() {

  siteName.value = '';
  siteURL.value = '';
}

function displaySites(arr) {
  var cartoona = ``;

  for (var i = 0 ; i < arr.length ; i++) {
    cartoona += `
    <tr>
      <td>${i + 1}</td>
      <td>${siteContainer[i].siteName}</td>
      <td><button onclick="visitSite(${i})" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></td>
      <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`
  }
  tableBody.innerHTML = cartoona;
}

function deleteSite(deleteIndex) {
  siteContainer.splice(deleteIndex , 1);
  localStorage.setItem('Sites' , JSON.stringify(siteContainer));
  displaySites(siteContainer)
}


function visitSite(visitIndex) {
  var websiteIndex = visitIndex;
  if (siteContainer[websiteIndex].siteURL) {
    open(`https://${siteContainer[websiteIndex].siteURL}`);
  }
}

function validSite(url) {
  var regexURL = /^www\.[A-z]{1,10}\.[a-z]{2,3}$/;

  if (regexURL.test(url)) {
    siteURL.classList.replace('is-invalid' , 'is-valid');
    return true;
  }else{
    siteURL.classList.add('is-invalid');
    return false;
  }
}