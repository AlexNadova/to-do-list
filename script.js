var form = document.getElementById("toDoForm");
var list = document.getElementById("toDoList");
var storage = window.localStorage;

//load items from local storage----------------------------------------------------
var todoStorage = storage.getItem("todo");
if (todoStorage) {
  todoStorage = JSON.parse(todoStorage);
  for (let i = 0; i < todoStorage.length; i++) {
    addItemToList(todoStorage[i].id, todoStorage[i].value);
  }
}

//change view when nav btn is clicked event created---------------------------------
var navItems = document.getElementsByClassName("nav__item");
for (let i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener("click", (e) => {
    let newEvent = new CustomEvent("changeContentEvent", {
      detail: { title: navItems[i].textContent },
    });
    document.dispatchEvent(newEvent);
  });
}

function changeTitle(event) {
  let title = document.querySelector("h1.title");
  title.textContent = "MY " + event.detail.title;
}
function changeContent(event) {
  list.innerHTML = "";
}

document.addEventListener("changeContentEvent", changeContent);
document.addEventListener("changeContentEvent", changeTitle);

//hide/show navigation---------------------------------------------------------------
var nav = document.querySelector(".nav__container");
var navOpen = document.querySelector(".nav__open");
document.addEventListener("click", (e) => {
  if (e.target == nav) {
    hideNav();
  }
});

document.querySelector(".nav>span").addEventListener("click", (e) => {
  hideNav();
});
navOpen.addEventListener("click", (e) => {
  showNav();
});

function hideNav() {
  nav.style.display = "none";
  navOpen.style.display = "block";
}
function showNav() {
  nav.style.display = "block";
  navOpen.style.display = "none";
}

//submit form-----------------------------------------------------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var input = form.elements[0];
  if (input.value !== "") {
    let id = generateId();
    if (!todoStorage) {
      todoStorage = [];
    }
    todoStorage.push({ id: id, value: input.value });
    addItemToList(id, input.value);
    storage.setItem("todo", JSON.stringify(todoStorage));
    //clear input
    input.placeholder = "Type new task...";
    input.value = "";
  } else {
    input.placeholder = "You need to input something.";
  }
});

function generateId() {
  let currentDate = new Date();
  return currentDate.getTime();
}

function createDeleteButton(listItem) {
  var deleteBtn = document.createElement("span");
  deleteBtn.addEventListener("click", (e) => {
    list.removeChild(listItem);
    for (let i = 0; i < todoStorage.length; i++) {
      if (todoStorage[i].id == listItem.getAttribute("id")) {
        todoStorage.splice(i, 1);
        storage.setItem("todo", JSON.stringify(todoStorage));
        break;
      }
    }
  });
  deleteBtn.innerText = "X";
  return deleteBtn;
}

function addItemToList(id, value) {
  let newListItem = document.createElement("li");
  newListItem.setAttribute("id", id);
  newListItem.innerText = value;

  //add delete button
  newListItem.appendChild(createDeleteButton(newListItem));

  //add item to the list
  list.appendChild(newListItem);
}
