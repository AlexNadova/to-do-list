var form = document.getElementById("toDoForm");
var list = document.getElementById("toDoList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  var input = form.elements[0];
  //check if input contains a value - in case html required is deleted
  if (input.validity.valueMissing) {
    input.setCustomValidity("");
    let newListItem = document.createElement("li");
    //for generating ids
    let currentDate = new Date();
    newListItem.setAttribute("id", currentDate.getTime());
    //add text from input
    newListItem.innerText = input.value;
    //clear input
    input.value = "";
    //add item to the list
    list.appendChild(newListItem);
  } else {
    input.setCustomValidity("Please, input a value.");
  }
});
