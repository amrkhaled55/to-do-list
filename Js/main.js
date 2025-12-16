// !Html Elements
var addBtn = document.getElementById("addBtn");
var modal = document.getElementById("modal");
var inputStatus = document.getElementById("status");
var inputcatagorey = document.getElementById("catagory");
var inputTitle = document.getElementById("title");
var inputDescription = document.getElementById("discription");
var addNewTask = document.getElementById("addTask");
var updateBtn = document.getElementById("updateTask");
var updataIndex = 0;
var theCountNext = document.querySelector(".countNext");
var theCountProgress = document.querySelector(".countProgress");
var theCountDone = document.querySelector(".countDone");
var searchInput=document.getElementById("search");
var sunModeIcon=document.getElementById("sunMode");
var nightModeIcon=document.getElementById("nightMode");   
 var barsIcon=document.getElementById("barsIcon"); 
 var gapicon=document.getElementById("gapicon");
 var counterNext=0;
 var counterProgress=0;
 var counterDone =0;
// ??App Variables
var taskContainer = [];
var containerStatus = {
  nextup: document.getElementById("nextUp"),
  progress: document.getElementById("progress"),
  done: document.getElementById("done"),
};


taskContainer = JSON.parse(localStorage.getItem("tasks")) || [];
loadCounters();


for (var i = 0; i < taskContainer.length; i++) {
  display(i);
}

// todo functions//////////
function showModel() {
  modal.classList.replace("d-none", "d-flex");
  window.scroll(0,0)
  document.body.style.overflow="hidden";
}
function hideModal() {
  modal.classList.replace("d-flex", "d-none");
    document.body.style.overflow="visible"

}
function addTask() {
if(regaxTitle()&& regexDescription()){
    var theTask = {
    status: inputStatus.value,
    categorey: inputcatagorey.value,
    title: inputTitle.value,
    description: inputDescription.value,
  };
  taskContainer.push(theTask);
  localStorage.setItem("tasks", JSON.stringify(taskContainer));

  display(taskContainer.length - 1);
  hideModal();
  increamnt(taskContainer.length - 1);
  saveCounters(); 
  clearInputs();
  deleteIcons();
}
}

function display(index) {
  var taskHtml = `
    <div class="task mt-2">
      <small class=" fw-bold h6"> Your Title: ${taskContainer[index].title}</small>
      <p class="my-3 fw-bold h6 "> Your Discription: ${taskContainer[index].description}</p>
      <p class="${taskContainer[index].categorey}">${taskContainer[index].categorey}</p>
      <div class="icons d-flex">
        <i class="fa-solid fa-pen-to-square" onclick="setTask(${index})"></i>
        <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i>
        <i class="fa-solid fa-palette" onclick="changeColor(event)"></i>
      </div>
    </div>`;

  containerStatus[taskContainer[index].status.toLowerCase()].querySelector(".details").innerHTML += taskHtml;
}

function deleteTask(index) {
  const allTasks = document.querySelectorAll(".task");
  const taskToDelete = allTasks[index];

  if (taskToDelete) {
 
    taskToDelete.classList.add("fade-out");
    setTimeout(() => {
      taskContainer.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(taskContainer));
      reRenderAll();
      saveCounters();
    }, 400); 
  }
}

function clearData() {
  containerStatus.nextup.querySelector(".details").innerHTML = "";
  containerStatus.progress.querySelector(".details").innerHTML = "";
  containerStatus.done.querySelector(".details").innerHTML = "";
}

function setTask(index) {
  inputStatus.value = taskContainer[index].status;
  inputcatagorey.value = taskContainer[index].categorey;
  inputTitle.value = taskContainer[index].title;
  inputDescription.value = taskContainer[index].description;
  showModel();
  addNewTask.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  updataIndex = index;
}

function updataTask() {
  clearData();
  var theTask = {
    status: inputStatus.value,
    categorey: inputcatagorey.value,
    title: inputTitle.value,
    description: inputDescription.value,
  };
  taskContainer.splice(updataIndex, 1, theTask);
  localStorage.setItem("tasks", JSON.stringify(taskContainer));

 
  reRenderAll();
  saveCounters();

  hideModal();
  clearInputs();
  addNewTask.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

function genereteColor() {
  var hxiColors = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  var color = "#";
  for (var i = 1; i <= 6; i++) {
    var random = Math.trunc(Math.random() * hxiColors.length);
    color += hxiColors[random];
  }
  return color + "77";
}
function changeColor(e) {
  e.target.closest(".task").style.backgroundColor = genereteColor();
}
function clearInputs() {
  inputStatus.value = "NextUp";
  inputcatagorey.value = "Health & fitness";
  inputTitle.value = "";
  inputDescription.value = "";
}

function increamnt(index) {
  if (taskContainer[index].status === "NextUp") {
    counterNext++;
    theCountNext.innerHTML = counterNext;
  } else if (taskContainer[index].status === "Progress") {
    counterProgress++;
    theCountProgress.innerHTML = counterProgress;
  } else if (taskContainer[index].status === "Done") {
    counterDone++;
    theCountDone.innerHTML = counterDone;
  }
}

function reRenderAll() {
  counterNext = counterProgress = counterDone = 0;
  theCountNext.innerHTML = theCountProgress.innerHTML = theCountDone.innerHTML = 0;
  clearData();
  for (var i = 0; i < taskContainer.length; i++) {
    display(i);
    increamnt(i);
  }
}

function saveCounters() {
  localStorage.setItem(
    "counters",
    JSON.stringify({
      next: counterNext,
      progress: counterProgress,
      done: counterDone,
    })
  );
}


function loadCounters() {
  var counters = JSON.parse(localStorage.getItem("counters"));
  if (counters) {
    counterNext = counters.next || 0;
    counterProgress = counters.progress || 0;
    counterDone = counters.done || 0;
  }
  theCountNext.innerHTML = counterNext;
  theCountProgress.innerHTML = counterProgress;
  theCountDone.innerHTML = counterDone;
}
function search(){
  var term=searchInput.value;
              clearData();
for(var i=0;i<taskContainer.length;i++){
        if(taskContainer[i].title.toLocaleLowerCase().includes(term.toLocaleLowerCase())||taskContainer[i].categorey.toLocaleLowerCase().includes(term.toLocaleLowerCase())){
         var taskHtml = `
    <div class="task mt-2">
      <small>${taskContainer[i].title}</small>
      <p class="my-3">${taskContainer[i].description}</p>
      <p>${taskContainer[i].categorey}</p>
      <div class="icons d-flex">
        <i class="fa-solid fa-pen-to-square" onclick="setTask(${i})"></i>
        <i class="fa-solid fa-trash" onclick="deleteTask(${i})"></i>
        <i class="fa-solid fa-palette" onclick="changeColor(event)"></i>
      </div>
    </div>`;

  containerStatus[taskContainer[i].status.toLowerCase()].querySelector(".details").innerHTML += taskHtml;
        }
      
}
if (term === "") {
    clearData();
    for (var i = 0; i < taskContainer.length; i++) {
      display(i);
    }
  }
    
}
function nightMode() {
  nightModeIcon.classList.add("active");
  sunModeIcon.classList.remove("active");
const root = document.querySelector(":root");
root.style.setProperty("--body-color", "#0D1117"); 
root.style.setProperty("--main-color", "#161B22"); 
root.style.setProperty("--main-btn", "#E0AA22");  
root.style.setProperty("--main-color-title", "#A5A6A7"); 
document.body.style.color = "#E0E0E0";  
document.body.style.transition = "all 0.3s ease";  
sunModeIcon.classList.remove("d-none");
nightModeIcon.classList.add("d-none");
}
function sunMode() {
   nightModeIcon.classList.remove("active");
  sunModeIcon.classList.add("active");
const root = document.querySelector(":root");
root.style.setProperty("--body-color", "#F7F8FA");   
root.style.setProperty("--main-color", "#FFFFFF");  
root.style.setProperty("--main-btn", "#E6B800"); 
root.style.setProperty("--main-color-title", "#333333"); 
var icons= document.body.querySelectorAll("nav .nav-item ,nav .nav-item");
for(var i=0 ;i<icons.length;i++){
    icons[i].style.backgroundColor="#000";
}
document.body.style.color = "#111111";
document.body.style.transition = "all 0.3s ease";  

sunModeIcon.classList.add("d-none");
nightModeIcon.classList.remove("d-none");
}
function thebars(){
  barsIcon.classList.add("active");
    gapicon.classList.remove("active")
var itmes=document.querySelectorAll(".the-show");
var theBody=document.querySelectorAll(".details");

for(var i=0;i<itmes.length;i++){
  itmes[i].classList.remove("col-lg-4");
itmes[i].style.setProperty("over-flow-x","scroll","!important")
}
for(var i=0;i<theBody.length;i++){
  theBody[i].classList.add("scroll-row");

}
}
function gap(){
  gapicon.classList.add("active");
  barsIcon.classList.remove("active");
var itmes=document.querySelectorAll(".the-show");
var theBody=document.querySelectorAll(".details");

for(var i=0;i<itmes.length;i++){
  itmes[i].classList.add("col-lg-4");
}
for(var i=0;i<theBody.length;i++){
  theBody[i].classList.remove("scroll-row");

}
}
function regaxTitle(){
  var messageError=document.getElementById("message");
  var term=/^[A-za-z]{3,10}$/
  var text=inputTitle.value;
  if(!term.test(text)){
   messageError.classList.remove("d-none");
   inputTitle.classList.add("is-invalid");
   inputTitle.classList.remove("is-valid");
   return false
  }
  else{
    messageError.classList.add("d-none");
       inputTitle.classList.remove("is-invalid");
   inputTitle.classList.add("is-valid");
    return true;
  }
}
function regexDescription(){
   var messageError=document.getElementById("messageDesc");
   
  if(inputDescription.value===""){
   messageError.classList.remove("d-none");
      inputDescription.classList.add("is-invalid");
   inputDescription.classList.remove("is-valid");
   return false
  }
    else{
    messageError.classList.add("d-none");
         inputDescription.classList.remove("is-invalid");
   inputDescription.classList.add("is-valid");
    return true;
  }
}
function deleteIcons(){
  if(inputTitle.value.length=="" && inputDescription.value==""){
   inputTitle.classList.remove("is-valid");
   inputDescription.classList.remove("is-valid");

  }
}
// *****Events*******
addBtn.addEventListener("click", showModel);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    hideModal();
    clearInputs();
    addNewTask.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  }
});
document.addEventListener("click", function (e) {
  if (e.target === modal) {
    hideModal();
  }
});
addNewTask.addEventListener("click", addTask);
updateBtn.addEventListener("click", updataTask);
searchInput.addEventListener("input",search);
sunModeIcon.addEventListener("click",sunMode);
nightModeIcon.addEventListener("click",nightMode);
barsIcon.addEventListener("click",thebars);
gapicon.addEventListener("click",gap);
inputTitle.addEventListener("blur",regaxTitle);
inputDescription.addEventListener("blur",regexDescription)