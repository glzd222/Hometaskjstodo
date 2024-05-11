const todoBtn = document.querySelector(".add");
const todoInput = document.querySelector("#todo-input");
let allTodos = [];
const todoList = document.querySelector(".todo-lists");
class Todo {
  constructor(todoText) {
    this.todoText = todoText;
    this.completed = false;
    this.id = Date.now();
  }
}

todoBtn.addEventListener("click", function () {

  const todo = new Todo(todoInput.value);
  if (todoInput.value != "") {
    allTodos.push(todo);
    console.log(allTodos);
    renderTodos(allTodos);
  } else {
    alert("inputu doldur");
  }
  resetTodo();
});

function resetTodo() {
  todoInput.value = "";
}

function renderTodos(arr) {
  todoList.innerHTML = "";

  arr.forEach((todo) => {
    const liElem = document.createElement("li");

    liElem.className = "list-group-item";
    liElem.innerHTML = `
      <div>
        <input
          class="form-check-input me-1"
          type="checkbox"
          value="text"
          id="firstCheckboxStretched"
        /><span>${todo.todoText}</span>
      </div>
      <div class="buttons">
      <button type="button" class="btn btn-success edit   data-id="${todo.id}" >Edit</button>
      <button type="button" class="btn btn-danger delete" data-id="${todo.id}">Delete</button>
    </div>`;
    todoList.append(liElem);
  });

  const allDeleteBtns = document.querySelectorAll(".delete");
  

  allDeleteBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
    
      this.parentElement.parentElement.remove();
      const id = this.getAttribute("data-id");
      deleteTodo(id);
    });
  });
}

const allEditBtns = document.querySelectorAll(".edit");
allEditBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    Swal.fire({
      title: "Submit your Github username",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
          const githubUrl = `
            https://api.github.com/users/${login}
          `;
          const response = await fetch(githubUrl);
          if (!response.ok) {
            return Swal.showValidationMessage(`
              ${JSON.stringify(await response.json())}
            `);
          }
          return response.json();
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
        });
      }
    });
  });
});

function deleteTodo(id) {
  allTodos = allTodos.filter((q) => q.id != id);
  renderTodos(allTodos);
}
