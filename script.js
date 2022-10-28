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

function dateAndTime(){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        document.getElementById("timestamp").setAttribute("value", dateTime)
}

function loadXMLDoc(val, id){
        names=[]
        for (var i = 0; i < observations.length; i++) {
          if(observations[i].account_org_id == val){
            console.log(observations[i])
            var a
            if (a == undefined){
              var a = observations[i].visit_number
            }
            if (a != 0){
              var b = observations[i].visit_number
              a = Math.max(a, b)
            }
            features.forEach((n)=>{
              try{
                        try{
                                for(var y=0; y<101; y++){
                                        if(n == ('teacher_grade'+y)){
                                                if(observations[i][n]!== ""){
                                                        document.getElementById('add_class_btn').click()
                                                }
                                        }
                                        else if(n == ('grade_book'+y)){
                                                if(observations[i][n]!== ""){
                                                        document.getElementById('add_book_btn').click()
                                                }
                                        }
                                }
                        }
                        catch(e){

                        }
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
                        document.getElementById(n).click()
                    }
                    else {
                      (document.getElementsByName(document.getElementById(n).getAttribute('name'))).forEach((x)=>{
                        if (x.getAttribute('value') == observations[i][val]){
                          x.click()
                        }
                      })
                    }
                  }
                  else if(document.getElementById(n).getAttribute('type') == "List"){
                        for (var list=0; list<document.getElementById(n).children.length; list++){
                               if (document.getElementById(n).children[list].getAttribute('value') == observations[i][val]){
                                        document.getElementById(n).children[list].selected = true
                               }
                        }
                  }
                  else if(document.getElementById(n).getAttribute('type') == 'date'){
                        var d = new Date(observations[i][val])
                        var day = ("0" + d.getDate()).slice(-2);
                        var month = ("0" + (d.getMonth() + 1)).slice(-2);
                        var year = d.getFullYear()
                        var d_value = year+"-"+month+"-"+day
                        document.getElementById(n).setAttribute('value', d_value)
                  }
                  else{
                        document.getElementById(n).setAttribute('value', observations[i][val])
                  }
                }
                }catch(e){
                }
            })
          }
          else{
                try{
                        document.getElementById('visit_number').setAttribute('value', 1)
                }catch(e){
                }                
          }
          dateAndTime()
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
        
        var tr = '<tr id="t'+(i+1)+'"><td><button id="add_class_btn" class = "btn btn-primary" data-toggle="tab" role="tab" aria-controls="home" aria-selected="true" onclick=addClass('+(i+1)+',"t'+(i+1)+'")>Add Class</button></td></tr>'
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

        cell1.innerHTML = '<td><select id="grade_t'+i+'" type="List" name="teacher_grade'+i+'">        <option id="6_t'+i+'" value = "6">6</option>        <option  id="7_t'+i+'"  value = "7">7</option>        <option  id="8_t'+i+'"  value = "8">8</option>        <option  id="9_t'+i+'"  value = "9">9</option>        <option  id="10_t'+i+'"  value = "10">10</option>        <option id="11_t'+i+'"  value = "11">11</option>        <option id="12_t'+i+'" value = "12">12</option>        <option id="eng_t'+i+'"  value = "Eng">Engineering</option>        <option id="med_t'+i+'" value = "Med">Medical</option>        <option id="fou_t'+i+'" value = "Foundation">Foundation</option></select></td>'

        cell2.innerHTML = '<td><select id="section_t'+i+'" type="List" name="teacher_section'+i+'">        <option id="a_t'+i+'" value = "A">A</option>        <option id="b_t'+i+'" value = "B">B</option>        <option id="c_t'+i+'" value = "C">C</option>        <option id="d_t'+i+'" value = "D">D</option>        <option id="e_t'+i+'" value = "E">E</option>        <option id="f_t'+i+'" value = "F">F</option>    </select></td>'

        cell3.innerHTML = '<td><select id="subject_t'+i+'" type="List" name = "teacher_subject'+i+'">        <option id="math_t'+i+'" value = "Math">Math</option>        <option id="sci_t'+i+'" value = "Science">Science</option>        <option id="soc_t'+i+'" value = "Social">Social Science</option>        <option id="phy_t'+i+'" value = "Physics">Physics</option>        <option id="chem_t'+i+'" value = "Chemistry">Chemistry</option>        <option id="bio_t'+i+'" value = "Biology">Biology</option>    </select></td>'

        cell4.innerHTML = '<td>        <input  type="text" class="form-inline" id="tname'+i+'" name="teacher_name'+i+'">    </td>'

        cell5.innerHTML = '<td><input  type="number" class="form-inline" id="tmobile'+i+'" name="mobile_number'+i+'"></td>'

        cell6.innerHTML = '<td>        <select id="internet_t'+i+'" type="List" name="home_internet'+i+'"><option id="hi_y_t'+i+'" value="Yes">Yes</option><option id="hi_n_t'+i+'" value="No">No</option></select>    </td>'

        cell7.innerHTML = '<td>                                        <input  type="number" class="form-inline" id="ttclasses'+i+'" name="weekly_classes_tt'+i+'">                                    </td>'

        cell8.innerHTML = '<td>        <input  type="number" class="form-inline" id="teclasses'+i+'" name="weekly_classes_embibe'+i+'">    </td>'

        cell9.innerHTML = '<td>        <input  type="number" class="form-inline" id="tthw'+i+'" name="weekly_homework_tt'+i+'">    </td> '

        cell10.innerHTML = '<td>        <input  type="number" class="form-inline" id="tehw'+i+'" name="weekly_homework_embibe'+i+'">    </td>'

        cell11.innerHTML = '<td>        <input  type="number" class="form-inline" id="ttt'+i+'" name="weekly_test_tt'+i+'">    </td> '

        cell12.innerHTML = '<td>        <input  type="number" class="form-inline" id="tet'+i+'" name="weekly_test_embibe'+i+'">    </td>'

        ta.insertAdjacentHTML('afterend',tr)
}

function disable_all_fields(id, given_class){
        var dis = document.getElementsByClassName(given_class)
        for (var i=0; i<dis.length; i++){
                if (id==given_class){
                        try{
                                if (document.getElementById(dis[i].id).checked){
                                        document.getElementById(dis[i].id).click()
                                }
                        }
                        catch(e){
                        }
                        document.getElementById(dis[i].id).disabled = true
                }else {
                        document.getElementById(dis[i].id).disabled = false
                }
        }
}

function addBook(i,id){
        
        var tr = '<tr id="b'+(i+1)+'"><td><button id="add_book_btn" class = "btn btn-primary" data-toggle="tab" role="tab" aria-controls="home" aria-selected="true" onclick=addBook('+(i+1)+',"b'+(i+1)+'")>Add Book</button></td></tr>'
        var ta = document.getElementById(id)
        ta.removeChild(ta.children[0])
        var cell1 = ta.insertCell(0)
        var cell2 = ta.insertCell(1)
        var cell3 = ta.insertCell(2)
        var cell4 = ta.insertCell(3)
        var cell5 = ta.insertCell(4)
        var cell6 = ta.insertCell(5)

        cell1.innerHTML = '<td><select id="grade_b'+i+'" type="List" name = "grade_book'+i+'">        <option id="6_b'+i+'" value = "6">6</option>        <option id="7_b'+i+'" value = "7">7</option>        <option id="8_b'+i+'" value = "8">8</option>        <option id="9_b'+i+'" value = "9">9</option>        <option id="10_b'+i+'" value = "10">10</ption>        <option id="11_b'+i+'" value = "11">11</option>        <option id="12_b'+i+'" value = "12">12</option>        <option id="eng_b'+i+'" value = "Eng">Eng</option>        <option id="med_b'+i+'" value = "Med">Med</option>        <option id="fou_b'+i+'" value = "Foundation">Foundation</option>     </select></td>'

        cell2.innerHTML = '<td><select id="board_b'+i+'" type="List" name = "board_book'+i+'">       <option id="cbse_b'+i+'" value = "CBSE">CBSE</option>        <option id="icse_b'+i+'" value = "ICSE">ICSE</option>        <option id="igcse_b'+i+'" value = "IGCSE">IGCSE</option>        <option id="state_b'+i+'" value = "State">State</option>        <option id="camb_b'+i+'" value = "Cambridge">Cambridge</option>        <option id="ib_b'+i+'" value = "IB">IB</option>     </select></td>'

        cell3.innerHTML = '<td><select id="subject_b'+i+'" name = "subject_book'+i+'">        <option id="math_b'+i+'" value = "Math">Math</option>        <option id="sci_b'+i+'" value = "Science">Science</option>        <option id="soc_b'+i+'" value = "Social">Social Science</option>        <option id="phy_b'+i+'" value = "Physics">Physics</option>        <option id="chem_b'+i+'" value = "Chemistry">Chemistry</option>        <option id="bio_b'+i+'" value = "Biology">Biology</option>     </select></td>'

        cell4.innerHTML = '<td><input  type="text" class="form-inline" id="name_b'+i+'" name="name_book'+i+'"></td>'

        cell5.innerHTML = '<td><input  type="text" class="form-inline" id="author_b'+i+'" name="author_book'+i+'"></td>'

        cell6.innerHTML = '<td><input  type="text" class="form-inline" id="publisher_b'+i+'" name="publisher_book'+i+'"></td>'

        ta.insertAdjacentHTML('afterend',tr)
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

function enable_subjects(id, given_class){
        var lever = "off"
        var grade = document.getElementsByClassName(given_class)
        var subs = document.getElementsByClassName(id)
        
        for (var i=0; i<grade.length; i++){
                if (document.getElementById(grade[i].id).checked){
                        var lever = "on"
                }
        }

        for (var i=0; i<subs.length; i++){
                if (lever == "on"){
                        document.getElementById(subs[i].id).disabled = false   
                }
                else{
                        if (document.getElementById(subs[i].id).checked){
                                document.getElementById(subs[i].id).click()
                        }
                        document.getElementById(subs[i].id).disabled = true
                }
        }
}

function mgt_rel(given_id, given_class){
        var dis = document.getElementsByClassName(given_id)
        if (given_id == given_class){
                document.getElementById(dis[0].getAttribute('id')).disabled = true
        }else {
                document.getElementById(dis[0].getAttribute('id')).disabled = false
        }
}
