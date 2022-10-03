var sheetID = "1tMn6VfBvD3kzKaNWVUv4sSDHaz6Ayot9aZ3drhtmJ8M";
var base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;

var sheetName = "users";
var qu = "Select * ";
var query = encodeURIComponent(qu);
var url = `${base}&sheet=${sheetName}&tq=${query}`
console.log(url)
var data = [];


var observations = new Object();
var features = new Object();
document.addEventListener('DOMContentLoaded', init)

var output = document.querySelector('.output')

function init(){
    console.log("ready");
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        console.log(rep);
        var jsData = JSON.parse(rep.substring(47).slice(0,-2));
        console.log(jsData);
        var colz = [];
        jsData.table.cols.forEach((heading)=>{
          if(heading.label){
            colz.push(heading.label.toLowerCase().replace(/\s/g,''));
          }
        })
        jsData.table.rows.forEach((main)=>{
          //console.log(main)
          var row = {};
          colz.forEach((ele,ind)=>{
            row[ele] = (main.c[ind] != null)?main.c[ind].v:"";
          })
          data.push(row);
          observations = data;
        })
        features = colz;
        //maker(data)
    })
}

// function hide_content(id){
//   document.getElementsByClassName("tab-pane").style.visibility = "hidden"
//   document.getElementById(id).style.visibility = "visible"
// }

function disable_others(id){
  var dis = document.getElementsByClassName(id)
  for (var i=0; i<dis.length; i++){
    if (document.getElementById(dis[i].id).disabled){
      document.getElementById(dis[i].id).disabled = false
    }else {
      document.getElementById(dis[i].id).disabled = true
    }
  }
}

function disable_all_fields(id){
  var dis = document.getElementsByClassName("cp_no_name")
  for (var i=0; i<dis.length; i++){
    if (id=="cp_no_name"){
      document.getElementById(dis[i].id).disabled = true
    }else {
      document.getElementById(dis[i].id).disabled = false
    }
  }
}

function disable_field(id){
  if (id == "erp"){
    document.getElementById("erp_name").disabled = false
  }else if (id == "erp_name"){
    document.getElementById(id).disabled = true
  }
}

function maker(json){
  
  //var div = document.createElement('div');
  //div.style.display = "grid"
  //output.append(div)
  var first = true
  json.forEach((el)=>{
    console.log(el)
    console.log(Object.keys(el));
    var keys = Object.keys(el);
    //div.style.gridTemplateColumns = `repeat(${keys.length}, ifr)`;
    if (first){
      first = false
      keys.forEach((heading)=>{
        //var ele = document.createElement('div')
        ele.textContent = heading.toUpperCase();
        ele.style.background = "black"
        ele.style.color = "white"
        div.append(ele);
      })
    }
    keys.forEach((key)=>{
      var ele = document.createElement('div')
      ele.style.border = '1px solid #ddd'
      ele.textContent = el[key];
      div.append(ele); 
    })
    
    console.log(keys);
  })

}


/*function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    var docu = xhttp.responseText;
    console.log(JSON.parse(docu.substr(47).slice(0,-2)))
  }
  xhttp.open("GET", "https://docs.google.com/spreadsheets/d/146bjpxiyAd-5KlFj5Q8K0O7PWNxSElv1l_I2EF6vdkI/gviz/tq?", true);
  xhttp.send();
}*/



function loadXMLDoc(val, id){
    names=[]
    console.log(features);
    console.log(observations[0].iteration_no);
    console.log(val, id)
    for (var i = 0; i < observations.length; i++) {
      if(observations[i].sf_id == val){
        console.log("Yes", i)
        features.forEach((n)=>{
          names.push(document.getElementsByName(n)[0].getAttribute('id'))
        })

        names.forEach((n)=>{
          document.getElementById(n).setAttribute('value', observations[i][n])
        })
        //document.getElementById("scc_name").setAttribute('value', observations[i]['scc_name'])
      }
    }
    // for (var j = 0; j < observations.length; j++){
    //   for (var i = 0; i < features.length; i++) {
    //     console.log(features[i], observations[j][features[i]])
    //     console.log(features[i])
    //     console.log(observations[j][features[i]])
    //   }
    // }
  
    // var tbody = document.getElementById('tbody');
    // var th = "";
    // for (var i = 0; i < features.length; i++){
    //   th += "<th>" + features[i] + "</th>"
    // }
    // tbody.innerHTML += th
  
    // for (var j = 0; j < observations.length; j++) {
    //   var td="";
    //   console.log(td)
    //   for (var i = 0; i < features.length; i++) {
    //     td += "<td>" + observations[j][features[i]] + "</td>";  
    //   }
    //   console.log(td)
    //   if (td!=null){
    //     console.log("Hello")
    //     tbody.innerHTML += "<tr>" + td + "</tr>";
    //   }
      
    // }
  }
