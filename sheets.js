const sheetID = "146bjpxiyAd-5KlFj5Q8K0O7PWNxSElv1l_I2EF6vdkI";
const base = "https://docs.google.com/spreadsheets/d/"+sheetID+"/gviz/tq?";

const sheetName = "users";
const query = encodeURIComponent('Select *');
const url = '${base}&sheet=${sheetName}&tq=${query}'
const data = []

document.addEventListener('DOMContentLoaded', init)

function init(){
    console.log("ready")
    fetch(url)
    .then(res.text())
    .then(rep => {
        console.log(rep);
        const jso = JSON.parse(rep.substr(47).slice(0,-2));
        console.log(jso)
    })
}
