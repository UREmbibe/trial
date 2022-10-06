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
          var row = {};
          colz.forEach((ele,ind)=>{
            row[ele] = (main.c[ind] != null)?main.c[ind].v:"";
          })
          data.push(row);
          observations = data;
        })
        features = colz;
    })
}

function disable_others(id){
  var dis = document.getElementsByClassName(id)
  for (var i=0; i<dis.length; i++){
    if (document.getElementById(dis[i].id).disabled){
      document.getElementById(dis[i].id).disabled = false
    }else {
      if (document.getElementById(dis[i].id).checked){
        document.getElementById(dis[i].id).click()
        //document.getElementById(dis[i].id).checked = false
      }
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

function disable_labs(id){
  var dis = document.getElementsByClassName("no_labs")
  for (var i=0; i<dis.length; i++){
    if (id=="no_labs"){
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
  var first = true
  json.forEach((el)=>{
    var keys = Object.keys(el);
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
  })
}

function loadXMLDoc(val, id){
  names=[]
  for (var i = 0; i < observations.length; i++) {
    if(observations[i].sf_id == val){
      var a
      if (a == undefined){
        var a = observations[i].iteration_no
      }else if (a != 0){
        var b = observations[i].iteration_no
        a = Math.max(a, b)
      }
      features.forEach((n)=>{
        try{
            names.push(document.getElementsByName(n)[0].getAttribute('id'))
          }catch(e){
          }
      })
      names.forEach((n)=>{
        try{
          if (n == "iteration_no"){
            document.getElementById(n).setAttribute('value', observations[i][n]+1)  
          }else{
            document.getElementById(n).setAttribute('value', observations[i][n])
          }
          }catch(e){
          }
      })
    }
  }
}

function tab_tog(id_nav){
  window.scrollTo(0, 0);
  document.getElementById(id_nav).click()
}


function contract(years, pps, students){
  document.getElementById("cd_total").setAttribute("value",years*pps*students)
}


function validateForm() {
  var valid_vals = document.getElementsByTagName("input")
  for (var i=0; i<valid_vals.length; i++){
    if (valid_vals[i].getAttribute("type")=="number"){
      if (valid_vals[i].value<0){
        alert(valid_vals[i].value +" assigned to a field. Values cannot be negative")
        return false;
      }
    }
  }
}

function contract_value(v1, v2){
  var dis = document.getElementsByClassName(v2)
  var nod = document.getElementsByClassName(v1)
  for (var i=0; i<dis.length; i++){
      document.getElementById(dis[i].id).readOnly = true
  }
  for (var i=0; i<nod.length; i++){
    document.getElementById(nod[i].id).readOnly = false
  }
}
