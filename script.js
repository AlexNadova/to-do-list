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
