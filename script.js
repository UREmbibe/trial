var sheetID = "1k89wi9QZYtsaLelfEBasRlDV4fYYxlYj6kq1p-yfsFs";
var base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;

var sheetName = "Data";
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

function loadXMLDoc(val, id){
        names=[]
        for (var i = 0; i < observations.length; i++) {
          if(observations[i].account_org_id == val){
            console.log(observations[i])
            var a
            if (a == undefined){
              console.log(a)
              var a = observations[i].visit_number
            }else if (a != 0){
              var b = observations[i].visit_number
              a = Math.max(a, b)
            }
            features.forEach((n)=>{
              try{
                  names.push(document.getElementsByName(n)[0].getAttribute('id'))
                }catch(e){
                }
            })
            console.log(names)
            names.forEach((n)=>{
              try{
                if (n == "visit_number"){
                  document.getElementById(n).setAttribute('value', observations[i][n]+1)
                }else{
                  var val = document.getElementById(n).getAttribute("name")
                  if (document.getElementById(n).getAttribute('type') == "checkbox"){
                    if (document.getElementById(n).getAttribute('value') == observations[i][val]){
                      document.getElementById(n).click()
                    }  
                  }
                  else if(document.getElementById(n).getAttribute('type') == "radio"){
                    
                    if (document.getElementById(n).getAttribute('value') == observations[i][val]){
                      document.getElementById(n).checked = true
                    }
                    else {
                      (document.getElementsByName(document.getElementById(n).getAttribute('name'))).forEach((x)=>{
                        if (x.getAttribute('value') == observations[i][val]){
                          x.click()
                        }
                      })
                      
      
                    }
                  }
                  else{
                  document.getElementById(n).setAttribute('value', observations[i][val])
                  }
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

function validate(obj, val)
{
        if(!obj.checkValidity())
        {
                alert("You have invalid input for "+val+". Correct it!");
        }
}

function validateMobile(val, field){
        if (val>9999999999 || val<6000000000){
                alert(field+" does not seem right. Please correct it")
        } 
}

function addClass(i,id){
        
        var tr = '<tr id="t'+(i+1)+'"><td><button class = "btn btn-primary" data-toggle="tab" role="tab" aria-controls="home" aria-selected="true" onclick=addClass('+(i+1)+',"t'+(i+1)+'")>Add Class</button></td></tr>'
        var ta = document.getElementById(id)
        ta.removeChild(ta.children[0])
        var cell1 = ta.insertCell(0)
        var cell2 = ta.insertCell(1)
        var cell3 = ta.insertCell(2)
        var cell4 = ta.insertCell(3)
        var cell5 = ta.insertCell(4)
        var cell6 = ta.insertCell(5)
        var cell7 = ta.insertCell(6)
        var cell8 = ta.insertCell(7)
        var cell9 = ta.insertCell(8)
        var cell10 = ta.insertCell(9)
        var cell11 = ta.insertCell(10)
        var cell12 = ta.insertCell(11)

        cell1.innerHTML = '<td><select type="List" name="Teacher Grade'+i+'">        <option id="6_t'+i+'" value = "6">6</option>        <option  id="7_t'+i+'"  value = "7">7</option>        <option  id="8_t'+i+'"  value = "8">8</option>        <option  id="9_t'+i+'"  value = "9">9</option>        <option  id="10_t'+i+'"  value = "10">10</option>        <option id="11_t'+i+'"  value = "11">11</option>        <option id="12_t'+i+'" value = "12">12</option>        <option id="eng_t'+i+'"  value = "Eng">Engineering</option>        <option id="med_t'+i+'" value = "Med">Medical</option>        <option id="fou_t'+i+'" value = "Foundation">Foundation</option></select></td>'

        cell2.innerHTML = '<td><select type="List" name="Teacher Section'+i+'">        <option id="a_t'+i+'" value = "A">A</option>        <option id="b_t'+i+'" value = "B">B</option>        <option id="c_t'+i+'" value = "C">C</option>        <option id="d_t'+i+'" value = "D">D</option>        <option id="e_t'+i+'" value = "E">E</option>        <option id="f_t'+i+'" value = "F">F</option>    </select></td>'

        cell3.innerHTML = '<td><select type="List" name = "Teacher Subject'+i+'">        <option id="math_t'+i+'" value = "Math">Math</option>        <option id="sci_t'+i+'" value = "Science">Science</option>        <option id="soc_t'+i+'" value = "Social">Social Science</option>        <option id="phy_t'+i+'" value = "Physics">Physics</option>        <option id="chem_t'+i+'" value = "Chemistry">Chemistry</option>        <option id="bio_t'+i+'" value = "Biology">Biology</option>    </select></td>'

        cell4.innerHTML = '<td>        <input  type="text" class="form-inline" id="tname'+i+'" name="Teacher Name'+i+'">    </td>'

        cell5.innerHTML = '<td><input  type="number" class="form-inline" id="tmobile'+i+'" name="Mobile Number'+i+'"></td>'

        cell6.innerHTML = '<td>        <select type="List" name="Home Internet'+i+'"><option id="hi_y_t'+i+'" value="Yes">Yes</option><option id="hi_n_t'+i+'" value="No">No</option></select>    </td>'

        cell7.innerHTML = '<td>                                        <input  type="number" class="form-inline" id="ttclasses'+i+'" name="Weekly Classes TT'+i+'">                                    </td>'

        cell8.innerHTML = '<td>        <input  type="number" class="form-inline" id="teclasses'+i+'" name="Weekly Classes Embibe'+i+'">    </td>'

        cell9.innerHTML = '<td>        <input  type="number" class="form-inline" id="tthw'+i+'" name="Weekly Homework TT'+i+'">    </td> '

        cell10.innerHTML = '<td>        <input  type="number" class="form-inline" id="tehw'+i+'" name="Weekly Homework Embibe'+i+'">    </td>'

        cell11.innerHTML = '<td>        <input  type="number" class="form-inline" id="ttt'+i+'" name="Weekly Test TT'+i+'">    </td> '

        cell12.innerHTML = '<td>        <input  type="number" class="form-inline" id="tet'+i+'" name="Weekly Test Embibe'+i+'">    </td>'

        ta.insertAdjacentHTML('afterend',tr)
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