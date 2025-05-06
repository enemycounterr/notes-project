const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

// add new todos
const generateTemplate = (todo) => {
  const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
        </li>
        `;
  list.innerHTML += html;
};

// clear todo text box input and prevent inputs with unecessary white space
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

// delete todos
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("edit")) {
    console.log("onEditIconClick", e.target);
    // fetch('/v6.5/notes/id/5')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     let html = '<ul>';
    //     data.forEach(user => {
    //       html += `<li>${user.name} - ${user.email}</li>`;
    //     });
    //     html += '</ul>';
    //     document.getElementById('user-container').innerHTML = html;
    //   })
    //   .catch(err => {
    //     document.getElementById('user-container').innerHTML = '<p>Error loading users.</p>';
    //   });

  }
});



list.addEventListener("click", (e) => {
  if (e.target.classList.contains("test")) {
    e.target.parentElement.remove();

    
  }
});


const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

// keyup event
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
