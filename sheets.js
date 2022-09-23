const sheetID = "146bjpxiyAd-5KlFj5Q8K0O7PWNxSElv1l_I2EF6vdkI";
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;

const sheetName = "users";
const query = encodeURIComponent("Select *");
const url = `${base}&sheet=${sheetName}&tq=${query}`
console.log(url)
const data = [];

document.addEventListener('DOMContentLoaded', init)

function init(){
    console.log("ready");
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        console.log(rep);
        //console.log(res);
        //const js0 = JSON.parse(rep.substr(47).slice(0,-2));
        //console.log(jso)
    })
}

/*function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     console.log(this.responseText);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}*/
