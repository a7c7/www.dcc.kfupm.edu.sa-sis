// A list of all couress are offered
let couress_offer =[];

let Selected_courses =[];
//The Add Buttons and Remove Buttons list
let Coures_Buttons=[];
var cours_to_display=[];
var index_Of_Buttons=0;

const day_index=7;
const start_Time_index=4;
const End_Time_index=5;


//**********************Disabling Available Courses**************************
if(document.getElementById("Table_Of_Available_Courses")!=null)
document.getElementById("Table_Of_Available_Courses").style.display="none";
//**********************Disabling Selected Courses**************************
if(document.getElementById("Table_Of_Selected_Courses")!=null)
document.getElementById("Table_Of_Selected_Courses").style.display="none";
   
//Clearing Both Availabel Courses and  Selected Courses
function ClearTheTables(){
    console.log("Clear The Tables");
//***************Clearing The Available Courses *********
const  Courses_Table=document.getElementById("Table_Of_Available_Courses"); 

if(Courses_Table.hasChildNodes){      
        var child = Courses_Table.lastElementChild; 

        while (child) {
            Courses_Table.removeChild(child);
            child = Courses_Table.lastElementChild;
        }
        
    }    
/////////////////////////////////////////////////////////    
    
//***************Clearing The Selectd Courses *********
const  Courses_Selected=document.getElementById("Table_Of_Selected_Courses"); 

if(Courses_Selected.hasChildNodes){      
        var child = Courses_Selected.lastElementChild; 

        while (child) {
            Courses_Selected.removeChild(child);
            child = Courses_Selected.lastElementChild;
        }
        
    }       

Selected_courses=[];         
couress_offer =[];
Coures_Buttons=[];
index_Of_Buttons=0;
}

   
// after sellcing the course 
function Show(){
    
    ClearTheTables();
    ClearTheSchedule();
    var the_selected_course = document.getElementById("Corues");
    
    if(the_selected_course.value=="01"){
        Show_Available_Courses("majers\\Accounting.txt");                                                      
    }
    else if(the_selected_course.value=="02"){
        Show_Available_Courses("majers\\CIT.txt");                                                      
    }
    else if(the_selected_course.value=="03"){
        Show_Available_Courses("majers\\HRM.txt");                                                      
    }
    else if(the_selected_course.value=="04"){
        Show_Available_Courses("majers\\MKT.txt");                                                      
    }
    else if(the_selected_course.value=="05"){
        Show_Available_Courses("majers\\General_Courses.txt");                                                      
    }
    else if(the_selected_course.value=="06"){
        Show_Available_Courses("majers\\SCM.txt");                                                      
    }
    else if(the_selected_course.value=="07"){
        Show_Available_Courses("majers\\ST.txt");                                                      
    }
    else{

    }
}


    function Show_Available_Courses(path){

        document.getElementById("Table_Of_Available_Courses").style.display="block";
        document.getElementById("Table_Of_Selected_Courses").style.display="block";
        var major = readTextFile(path);                                                
        var Col_index=1;
        var Row_index=0;

            for (let i = 0; i < major.split("\n").length;i++) {
                                       
                if(i==0){
                    couress_offer[i]=document.createElement("tr");
                    
                    document.getElementById("Table_Of_Available_Courses").appendChild(couress_offer[Row_index]);
                    
                    var itme = major.split("\n")[0];

                    let x =document.createElement("td");
                    x.innerText = itme;  
                    couress_offer[i].appendChild(x);
                    Col_index++;
                    
                }
                else{

                
                    if(Col_index==10){
                        
                        
                        //***************creating in at button***********

                        Coures_Buttons[index_Of_Buttons] =document.createElement("input");
                        Coures_Buttons[index_Of_Buttons].type="button";
                        Coures_Buttons[index_Of_Buttons].value="Add";
                        
                        Coures_Buttons[index_Of_Buttons].setAttribute("onclick","Add_Selectd_Courses("+index_Of_Buttons+")");
                                                   
                        couress_offer[Row_index].lastElementChild.appendChild(Coures_Buttons[index_Of_Buttons]);
                        index_Of_Buttons++;
                         //***************--------------------***********

                        Row_index++;//Going to the next row
                        //Creating the next row
                        couress_offer[Row_index]=document.createElement("tr");
                        
                       
                        
                        document.getElementById("Table_Of_Available_Courses").appendChild(couress_offer[Row_index]);                                
                        Col_index=1;                            
                    }
                    else{
                        
                        document.getElementById("Table_Of_Available_Courses").appendChild(couress_offer[Row_index]);

                        let x = document.createElement("td");                            
                        let itme = major.split("\n")[i];
                                                    
                        if(itme.substring(0,itme.length-1)=="Core"||itme.substring(0,itme.length-1)=="core"){                                   
                            couress_offer[Row_index].classList.add("Core_Cours");
                            
                        }
                        else if(itme.substring(0,itme.length-1)=="elective"||itme.substring(0,itme.length-1)=="Elective"){                                    
                            couress_offer[Row_index].classList.add("Elective_Cours");                                    
                        }
                        x.innerText = itme;  
                        couress_offer[Row_index].appendChild(x);
                        Col_index++;
                    }
                }
                                                        
            }
    }

    function Add_Selectd_Courses(index){


    let Selected_courses_Table=document.getElementById("Table_Of_Selected_Courses");
   
   

    var Dont_Interfere_With_The_schedule =! Does_It_Interfer(index);
    
    if(Dont_Interfere_With_The_schedule==true){

    Selected_courses_Table.appendChild(couress_offer[index]);
    
    Selected_courses[index] = couress_offer[index];
    Coures_Buttons[index].value="Remove";
    Coures_Buttons[index].setAttribute("onclick","Remove_Selectd_Courses("+index+")");
    

    UpdateSchedule(index);
    }
    else{
        console.log("No Way");
    }
    
        
    }
    
    function Does_It_Interfer(index){

    var Days=couress_offer[index].children[day_index].innerText;
    var Start_Time=parseInt(couress_offer[index].children[start_Time_index].innerText);

    if(Days.includes("U")){
        if(Start_Time==8){
            var Schedule =document.getElementById("Sunday");
            if(Schedule.children[1].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[1].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==9){
            var Schedule =document.getElementById("Sunday");
            if(Schedule.children[2].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[2].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==10){
            var Schedule =document.getElementById("Sunday");
            if(Schedule.children[3].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[3].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==11){
            var Schedule =document.getElementById("Sunday");
            
            if(Schedule.children[4].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[4].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==13){
            var Schedule =document.getElementById("Sunday");
            if(Schedule.children[5].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[5].innerText+"*");
                return true;
            }
        }
        
    }
    
    else if(Days.includes("M")){
        if(Start_Time==8){
            var Schedule =document.getElementById("Monday");
            if(Schedule.children[1].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[1].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==9){
            var Schedule =document.getElementById("Monday");
            if(Schedule.children[2].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[2].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==10){
            var Schedule =document.getElementById("Monday");
            if(Schedule.children[3].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[3].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==11){
            var Schedule =document.getElementById("Monday");                    
            if(Schedule.children[4].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[4].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==13){
            var Schedule =document.getElementById("Monday");
            if(Schedule.children[5].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[5].innerText+"*");
                return true;
            }
        }
        
    }

    else if(Days.includes("T")){
        if(Start_Time==8){
            var Schedule =document.getElementById("Tuesday");
            if(Schedule.children[1].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[1].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==9){
            var Schedule =document.getElementById("Tuesday");
            if(Schedule.children[2].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[2].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==10){
            var Schedule =document.getElementById("Tuesday");
            if(Schedule.children[3].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[3].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==11){
            var Schedule =document.getElementById("Tuesday");                    
            if(Schedule.children[4].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[4].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==13){
            var Schedule =document.getElementById("Tuesday");
            if(Schedule.children[5].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[5].innerText+"*");
                return true;
            }
        }
        
    }

    else if(Days.includes("W")){
        if(Start_Time==8){
            var Schedule =document.getElementById("Wednesday");
            if(Schedule.children[1].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[1].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==9){
            var Schedule =document.getElementById("Wednesday");
            if(Schedule.children[2].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[2].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==10){
            var Schedule =document.getElementById("Wednesday");
            if(Schedule.children[3].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[3].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==11){
            var Schedule =document.getElementById("Wednesday");
            if(Schedule.children[4].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[4].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==13){
            var Schedule =document.getElementById("Wednesday");
            if(Schedule.children[5].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[5].innerText+"*");
                return true;
            }
        }
        
    }

    else if(Days.includes("R")){
        if(Start_Time==8){
            var Schedule =document.getElementById("Thursday");
            if(Schedule.children[1].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[1].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==9){
            var Schedule =document.getElementById("Thursday");
            if(Schedule.children[2].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[2].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==10){
            var Schedule =document.getElementById("Thursday");
            if(Schedule.children[3].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[3].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==11){
            var Schedule =document.getElementById("Thursday");
            if(Schedule.children[4].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[4].innerText+"*");
                return true;
            }
        }
        else if(Start_Time==13){
            var Schedule =document.getElementById("Thursday");
            if(Schedule.children[5].innerText!=""){
                console.log("you can not add this Course it will interfer with*"+Schedule.children[5].innerText+"*");
                return true;
            }
        }
        
    }
           
    else{return true;}
    }

    function Remove_Selectd_Courses(index){
        
        console.log("Remove:"+index);
        var Table_Of_Available_Courses=document.getElementById("Table_Of_Available_Courses");
        Table_Of_Available_Courses.appendChild(couress_offer[index]);
        
        
        
        delete Selected_courses[index];
    
        RemovingItmeFormTheSchedule(index,couress_offer[index]);
        
        
        Coures_Buttons[index].value="Add";
        Coures_Buttons[index].setAttribute("onclick","Add_Selectd_Courses("+index+")");
        

    }


   
    

    function UpdateSchedule(index){
        
        Selected_courses.forEach(element => {
            
           var Days = element.childNodes[day_index].innerText;
           var Start_Time =parseInt(element.childNodes[start_Time_index].innerText);
           var End_Time =parseInt(element.childNodes[End_Time_index].innerText);
           
           
                              
           if(Days.includes("U")){
            
            if(Start_Time == 8){                                               
                
                Add_Courses_To_The_Schedule(index,"Sunday",1,Start_Time,End_Time,element);
            }
            else if(Start_Time==9)
            {
               Add_Courses_To_The_Schedule(index,"Sunday",2,Start_Time,End_Time,element);
            }
            else if(Start_Time==10)
            {
                Add_Courses_To_The_Schedule(index,"Sunday",3,Start_Time,End_Time,element);
            }
            else if(Start_Time==11)
            {
                Add_Courses_To_The_Schedule(index,"Sunday",4,Start_Time,End_Time,element);
            }
            else if(Start_Time==13)
            {
                Add_Courses_To_The_Schedule(index,"Sunday",5,Start_Time,End_Time,element);
            }
           }
           if(Days.includes("M")){
            if(Start_Time == 8){                                               
                
                Add_Courses_To_The_Schedule(index,"Monday",1,Start_Time,End_Time,element);
            }
            else if(Start_Time==9)
            {
               Add_Courses_To_The_Schedule(index,"Monday",2,Start_Time,End_Time,element);
            }
            else if(Start_Time==10)
            {
                Add_Courses_To_The_Schedule(index,"Monday",3,Start_Time,End_Time,element);
            }
            else if(Start_Time==11)
            {
                Add_Courses_To_The_Schedule(index,"Monday",4,Start_Time,End_Time,element);
            }
            else if(Start_Time==13)
            {
                Add_Courses_To_The_Schedule(index,"Monday",5,Start_Time,End_Time,element);
            }

           }
           if(Days.includes("T")){
            if(Start_Time == 8){                                               
                
                Add_Courses_To_The_Schedule(index,"Tuesday",1,Start_Time,End_Time,element);
            }
            else if(Start_Time==9)
            {
               Add_Courses_To_The_Schedule(index,"Tuesday",2,Start_Time,End_Time,element);
            }
            else if(Start_Time==10)
            {
                Add_Courses_To_The_Schedule(index,"Tuesday",3,Start_Time,End_Time,element);
            }
            else if(Start_Time==11)
            {
                Add_Courses_To_The_Schedule(index,"Tuesday",4,Start_Time,End_Time,element);
            }
            else if(Start_Time==13)
            {
                Add_Courses_To_The_Schedule(index,"Tuesday",5,Start_Time,End_Time,element);
            }
           }
           if(Days.includes("W")){
            if(Start_Time == 8){                                               
                
                Add_Courses_To_The_Schedule(index,"Wednesday",1,Start_Time,End_Time,element);
            }
            else if(Start_Time==9)
            {
               Add_Courses_To_The_Schedule(index,"Wednesday",2,Start_Time,End_Time,element);
            }
            else if(Start_Time==10)
            {
                Add_Courses_To_The_Schedule(index,"Wednesday",3,Start_Time,End_Time,element);
            }
            else if(Start_Time==11)
            {
                Add_Courses_To_The_Schedule(index,"Wednesday",4,Start_Time,End_Time,element);
            }
            else if(Start_Time==13)
            {
                Add_Courses_To_The_Schedule(index,"Wednesday",5,Start_Time,End_Time,element);
            }
           }
           if(Days.includes("R")){
            if(Start_Time == 8){                                               
                
            Add_Courses_To_The_Schedule(index,"Thursday",1,Start_Time,End_Time,element);
            }
            else if(Start_Time==9)
            {
            Add_Courses_To_The_Schedule(index,"Thursday",2,Start_Time,End_Time,element);
            }
            else if(Start_Time==10)
            {
                Add_Courses_To_The_Schedule(index,"Thursday",3,Start_Time,End_Time,element);
            }
            else if(Start_Time==11)
            {
                Add_Courses_To_The_Schedule(index,"Thursday",4,Start_Time,End_Time,element);
            }
            else if(Start_Time==13)
            {
                Add_Courses_To_The_Schedule(index,"Thursday",5,Start_Time,End_Time,element);
            }
           }

        });

    }

    function Add_Courses_To_The_Schedule(index,Day,Time,Start_Time,End_Time,Colem){

        var Schedule =document.getElementById(Day);
                    
        //disabling Setting the starting position in the table
        cours_to_display[index]=Schedule.children[Time];
        //changing the Text
        cours_to_display[index].innerText=Colem.childNodes[1].innerText;
        //changing the style
        cours_to_display[index].setAttribute("class","Cours_In_Schedule");
        //giving the course the right column span
        cours_to_display[index].setAttribute("colspan",End_Time-Start_Time); 
                            
    


    }

    function RemovingSchedule(Day,Time){
        var Schedule =document.getElementById(Day); 
        
         Schedule.children[Time].innerText="";
         Schedule.children[Time].setAttribute("class","");
         Schedule.children[Time].setAttribute("colspan",1); 

    }

    function RemovingItmeFormTheSchedule(index,element){
       
        var Days=couress_offer[index].childNodes[day_index].innerText;
        var Start_Time=parseInt(couress_offer[index].childNodes[start_Time_index].innerText);
                    
        if(Days.includes("U")){
                             
        if(Start_Time == 8){                                               
            
        RemovingSchedule("Sunday",1);
        }
        else if(Start_Time==9)
        {
            RemovingSchedule("Sunday",2);
        }
        else if(Start_Time==10)
        {
            RemovingSchedule("Sunday",3);
        }
        else if(Start_Time==11)
        {
            RemovingSchedule("Sunday",4);
        }
        else if(Start_Time==13){
            RemovingSchedule("Sunday",5);
        }
    }                
    
        if(Days.includes("M")){
                                                                                
            if(Start_Time == 8){                                               
            
            RemovingSchedule("Monday",1);
            }
            else if(Start_Time==9)
            {
                RemovingSchedule("Monday",2);
            }
            else if(Start_Time==10)
            {
                RemovingSchedule("Monday",3);
            }
            else if(Start_Time==11)
            {
                RemovingSchedule("Monday",4);
            }
            else if(Start_Time==13){
                RemovingSchedule("Monday",5);
            }
        
        }
        
        if(Days.includes("T")){
        
            if(Start_Time == 8){                                               
                
                RemovingSchedule("Tuesday",1);
                }
                else if(Start_Time==9)
                {
                    RemovingSchedule("Tuesday",2);
                }
                else if(Start_Time==10)
                {
                    RemovingSchedule("Tuesday",3);
                }
                else if(Start_Time==11)
                {
                    RemovingSchedule("Tuesday",4);
                }
                else if(Start_Time==13){
                    RemovingSchedule("Tuesday",5);
                }
        }

        if(Days.includes("W")){
        
        if(Start_Time == 8){                                               
            
            RemovingSchedule("Wednesday",1);
            }
            else if(Start_Time==9)
            {
                RemovingSchedule("Wednesday",2);
            }
            else if(Start_Time==10)
            {
                RemovingSchedule("Wednesday",3);
            }
            else if(Start_Time==11)
            {
                RemovingSchedule("Wednesday",4);
            }
            else if(Start_Time==13){
                RemovingSchedule("Wednesday",5);
            }
        }

        if(Days.includes("R")){
            
            if(Start_Time == 8){                                               
            
            RemovingSchedule("Thursday",1);
            }
            else if(Start_Time==9)
            {
                RemovingSchedule("Thursday",2);
            }
            else if(Start_Time==10)
            {
                RemovingSchedule("Thursday",3);
            }
            else if(Start_Time==11)
            {
                RemovingSchedule("Thursday",4);
            }
            else if(Start_Time==13){
                RemovingSchedule("Thursday",5);
            }
        }
        

                  
    
    }

    function ClearTheSchedule(){
        
        //Clear any Text in every day in the Schedule

        //*****************Sunday*****************
        var Sunday = document.getElementById("Sunday");                
        for (let i = 1; i < Sunday.children.length; i++) {
            Sunday.children[i].innerText=" ";
            Sunday.children[i].setAttribute("class","");
            Sunday.children[i].setAttribute("colspan","0");
        }
        // //*****************Monday*****************
        var Monday = document.getElementById("Monday");                
        for (let i = 1; i < Monday.children.length; i++) {
            Monday.children[i].innerText=" ";
            Monday.children[i].setAttribute("class","");
            Monday.children[i].setAttribute("colspan","0");
        }

        // //*****************Tuesday*****************
        var Tuesday = document.getElementById("Tuesday");                
        for (let i = 1; i < Tuesday.children.length; i++) {
            Tuesday.children[i].innerText=" ";
            Tuesday.children[i].setAttribute("class","");
            Tuesday.children[i].setAttribute("colspan","0");
        }
        // //*****************Wednesday*****************
        var Wednesday = document.getElementById("Wednesday");                
        for (let i = 1; i < Wednesday.children.length; i++) {
            Wednesday.children[i].innerText=" ";
            Wednesday.children[i].setAttribute("class","");
            Wednesday.children[i].setAttribute("colspan","0");
        }
        // //*****************Thursday*****************
        var Thursday = document.getElementById("Thursday");                
        for (let i = 1; i < Thursday.children.length; i++) {
            Thursday.children[i].innerText=" ";
            Thursday.children[i].setAttribute("class","");
            Thursday.children[i].setAttribute("colspan","0");
        }



    }

    function readTextFile(file)
    {
        var rawFile = new XMLHttpRequest();
        var result="";
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    result = allText;
                }
            }
        }
        rawFile.send(null);
        return result;
    }          




