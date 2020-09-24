var form = document.getElementById("toDoForm");
var list = document.getElementById("toDoList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  var input = form.elements[0];
  let newListItem = document.createElement("li");
  //add text from input
  newListItem.innerText = input.value;
  //clear input
  input.value = "";
  //add item to the list
  list.appendChild(newListItem);
});
