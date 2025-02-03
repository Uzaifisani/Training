document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const ulTodo = document.getElementById("ul-todo");
  const deleteAll = document.getElementById('button-delete-all');

  let editMode = false;
  let editElement = null;

  buttonTodo.addEventListener("click", () => {
    const text = inputTodo.value;
    if (editMode) {
      editElement.querySelector(".text-todo").textContent = text;
      editMode = false;
      editElement = null;
      buttonTodo.textContent = "Add";
    } else {
      createTodo(text);
    }
    inputTodo.value = "";
    saveAllTodo();
  });

  const createTodo = (task) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `<span class="text-todo">${task}</span>
    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger">Edit</button>
      <button type="button" class="btn btn-warning">Delete</button>
    </div>`;
    ulTodo.appendChild(li);
  };

  ulTodo.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-warning")) {
      let confirmation = confirm("Do you want to delete the Task??");
      if (confirmation) {
         e.target.closest(".list-group-item").remove();
         saveAllTodo();
      } 
    }

    if (e.target.classList.contains("btn-danger")) {
      const li = e.target.closest(".list-group-item");
      const textSpan = li.querySelector(".text-todo");
      const oldText = textSpan.textContent;
      
      // Create input field
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.className = "form-control text-todo";
      inputField.value = oldText;
      
      // Replace span with input
      textSpan.replaceWith(inputField);
      inputField.focus();

      // Handle input blur and enter key
      inputField.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          const newText = inputField.value;
          const newSpan = document.createElement("span");
          newSpan.className = "text-todo";
          newSpan.textContent = newText;
          inputField.replaceWith(newSpan);
          saveAllTodo();
        }
      });

      inputField.addEventListener("blur", () => {
        const newText = inputField.value;
        const newSpan = document.createElement("span");
        newSpan.className = "text-todo";
        newSpan.textContent = newText;
        inputField.replaceWith(newSpan);
        saveAllTodo();
      });
    }
  });

  const saveAllTodo = () => {
    const allTodos = [...document.querySelectorAll(".text-todo")].map(
      (task) => task.textContent
    );

    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };

  const loadAllTodo = () => {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    allTodos.forEach((task) => createTodo(task));
  };

  deleteAll.addEventListener('click', () => {
    let confirmation = confirm("Are you sure , you want to delete All the Taks??");
    if (confirmation) {
      ulTodo.innerHTML = "";
    localStorage.removeItem('allTodos');
    }
  });

  loadAllTodo();
});
