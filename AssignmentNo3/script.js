document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const ulTodo = document.getElementById("ul-todo");
  const deleteAll = document.getElementById("button-delete-all");

  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  const LoadTask = () => {
    axios
      .get(API_URL, { params: { _limit: 5 } })
      .then((res) => {
        res.data.forEach((element) => {
          createTodo(element.id, element.title);
        });
        TostMsg("To Do Created. API Called Successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  LoadTask();

  const createTodo = (id, task) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-start";
    li.draggable = true;
    li.dataset.id = id;
    li.style.cursor = "move";
    li.innerHTML = `<span class="text-todo">${task}</span>
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-danger">Edit</button>
        <button type="button" class="btn btn-warning">Delete</button>
      </div>`;
    ulTodo.appendChild(li);
  };

  buttonTodo.addEventListener("click", async () => {
    const text = inputTodo.value;
    const res = await axios.post(API_URL, {
      title: text,
      completed: false,
    });
    if (res.status == 201) {
      createTodo(res.data.id, text);
      TostMsg("New Task Added Successfully!!");
    }
    inputTodo.value = "";
  });

  const TostMsg = (msg) => {
    Toastify({
      text: msg,
      duration: 1000,
      gravity: "top",
      position: "center",
      style: {
        background: "linear-gradient(to right, #00b09b,#96c93d)",
      },
    }).showToast();
  };

  ulTodo.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-warning")) {
      const li = e.target.closest(".list-group-item");
      const todoId = li.dataset.id;
      const res = await axios.delete(`${API_URL}/${todoId}`);
      li.remove();
      if (res.status == 200) {
        TostMsg("ToDo Deleted");
      }
    }
  });

  ulTodo.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-danger")) {
      const li = e.target.closest(".list-group-item");
      const taskSpan = li.querySelector(".text-todo");
      const editButton = e.target;
      const todoId = li.dataset.id;

      if (editButton.textContent === "Edit") {
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.className = "form-control";
        inputField.value = taskSpan.textContent;
        taskSpan.replaceWith(inputField);
        editButton.textContent = "Update";
      } else {
        const inputField = li.querySelector("input");
        const updatedText = inputField.value;
        const res = await axios.put(`${API_URL}/${todoId}`, {
          title: updatedText,
          completed: false,
        });
        if (res.status == 200) {
          TostMsg("Todo List Udated");
        }
        const newSpan = document.createElement("span");
        newSpan.className = "text-todo";
        newSpan.textContent = updatedText;
        inputField.replaceWith(newSpan);
        editButton.textContent = "Edit";
      }
    }
  });

  deleteAll.addEventListener("click", async () => {
    let confirmation = confirm("Are you sure you want to delete all todos?");
    if (confirmation) {
      const allTodos = document.querySelectorAll(".list-group-item");
      allTodos.forEach((todo) => todo.remove());
    } else {
      TostMsg("Clicked No");
    }
  });
});
