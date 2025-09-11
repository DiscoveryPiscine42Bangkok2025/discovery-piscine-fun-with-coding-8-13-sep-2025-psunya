const list = document.getElementById("ft_list");

window.onload = () => {
  let saved = getCookie("todos");
  if (saved) {
    let todos = JSON.parse(saved);
    todos.forEach(text => addTodo(text));
  }
};

function newTodo() {
  let task = prompt("Enter a new TO DO:");
  if (task && task.trim() !== "") {
    addTodo(task.trim());
    saveTodos();
  }
}

function addTodo(text) {
  let div = document.createElement("div");
  div.className = "todo";
  div.innerText = text;

  div.onclick = function () {
    if (confirm("Do you want to remove this TO DO?")) {
      div.remove();
      saveTodos();
    }
  };

  list.insertBefore(div, list.firstChild);
}

function saveTodos() {
  let todos = [];
  document.querySelectorAll(".todo").forEach(el => {
    todos.push(el.innerText);
  });
  setCookie("todos", JSON.stringify(todos), 7);
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}