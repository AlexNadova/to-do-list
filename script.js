var form = document.getElementById("toDoForm");
var list = document.getElementById("toDoList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  var input = form.elements[0];
  if (input.value !== "") {
    let newListItem = document.createElement("li");
    //for generating ids
    let currentDate = new Date();
    newListItem.setAttribute("id", currentDate.getTime());
    //add text from input
    input.placeholder = "Type new task...";
    newListItem.innerText = input.value;
    //clear input
    input.value = "";
    //add delete button
    var deleteBtn = document.createElement("span");
    deleteBtn.addEventListener("click", (e) => {
      list.removeChild(newListItem);
    });
    deleteBtn.innerText = "X";
    newListItem.appendChild(deleteBtn);
    //add item to the list
    list.appendChild(newListItem);
  } else {
    input.placeholder = "You need to input something.";
  }
});

var navItems = document.getElementsByClassName("nav__item");
for (let i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener("click", (e) => {
    let newEvent = new CustomEvent("changeContentEvent", {
      detail: { title: navItems[i].textContent },
    });
    document.dispatchEvent(newEvent);
  });
}

var title = document.querySelector("h1.title");

function changeTitle(event) {
  title.textContent = "MY " + event.detail.title;
}
function changeContent(event) {
  list.innerHTML = "";
}

document.addEventListener("changeContentEvent", changeContent);
document.addEventListener("changeContentEvent", changeTitle);

var nav = document.querySelector(".nav__container");
var navOpen = document.querySelector(".nav__open");
document.addEventListener("click", (e) => {
  if (e.target == nav) {
    nav.style.display = "none";
    navOpen.style.display = "block";
  }
});
document.querySelector(".nav>span").addEventListener("click", (e) => {
  nav.style.display = "none";
  navOpen.style.display = "block";
});
navOpen.addEventListener("click", (e) => {
  nav.style.display = "block";
  navOpen.style.display = "none";
});

//refactor code
//save items (db, storage??)
