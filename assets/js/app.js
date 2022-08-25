// declarations
const studentForm = document.getElementById("stdForm");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const studentInfo = document.getElementById("stdInfo");
const submitBtn = document.getElementById( "submitBtn");
const updateBtn = document.getElementById("updateBtn");

let studentData = [];

// functions

// UUID function
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// function to get localstorage data
const localData = () => {
    return JSON.parse(localStorage.getItem('studentData'));
}

// click:Edit button handler
const onEditHandler = (ele) => {
    let editId = ele.dataset.uid;
    // saving selected element UID to localstorage 
    localStorage.setItem('editId', editId);

    let tempArr = localData();
    let editObj = tempArr.find(ele => ele.uid === editId);
    fname.value = editObj.firstName;
    lname.value = editObj.lastName;
    email.value = editObj.email;
    
    // to show 'update' button
    submitBtn.classList.add('d-none');    
    updateBtn.classList.remove('d-none');    
}

// click:delete button handler
const onDeleteHandler = (ele) => {
    let deleteId = ele.dataset.uid;
    //TO DO: getting local storage data nad apply filter
    studentData = localData().filter(obj => obj.uid != deleteId);    
    templating(studentData);
    localStorage.setItem('studentData', JSON.stringify(studentData));
}

// templating function
const templating = (arr) => {
    let final ='';
    arr.forEach((ele, i) => {
       final += `<tr>
                    <td>${i + 1}</td>
                    <td>${ele.firstName}</td>
                    <td>${ele.lastName}</td>
                    <td>${ele.email}</td>
                    <td><button class="btn btn-success" data-uid = "${ele.uid}" onclick = 'onEditHandler(this)'>Edit</button></td>
                    <td><button class="btn btn-danger" data-uid = "${ele.uid}" onclick = 'onDeleteHandler(this)'>Delete</button></td>
                </tr>` 
    });
    studentInfo.innerHTML = final;
}

// to get the saved data from localstorage
if(localStorage.getItem('studentData')){
    studentData = localData();
    templating(studentData);
}

// submit event callback function
const onSubmitHandler = (e) => {
    e.preventDefault();
    let obj = {
        firstName : fname.value,
        lastName : lname.value,
        email : email.value,
        uid : create_UUID()
    }
    studentData.push(obj);
    //for saving to localstorage
    localStorage.setItem('studentData', JSON.stringify(studentData));
    templating(studentData);
    e.target.reset();
}

// click:update button hamdler
const onUpdateHandler = (e) => {
    let updateId = localStorage.getItem('editId');

    studentData = localData();
    studentData.forEach(obj => {
        if(obj.uid === updateId){
            obj.firstName = fname.value;
            obj.lastName = lname.value;
            obj.email = email.value;
        }
    })

    localStorage.setItem('studentData', JSON.stringify(studentData));
    templating(studentData);
    
    studentForm.reset();
    submitBtn.classList.remove('d-none');    
    updateBtn.classList.add('d-none'); 
}


// events
studentForm.addEventListener('submit', onSubmitHandler);
updateBtn.addEventListener('click', onUpdateHandler);