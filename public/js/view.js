document.addEventListener('DOMContentLoaded', (e) => {
  console.log('DOM loaded!');
  const form = document.getElementById('todo-form')
  const newTodoInput = document.querySelector('input.new-item')
  const todoListSpan = document.querySelector('.todo-container')

  const getTodos = () => {
    fetch('/api/todos')
      .then(response => response.json())
      .then(todos => renderTodoList(todos))
  }

  const renderTodoList = (todos) => {

    const todosHTML = todos.map(todo => {

      const li = `<li class="list-group-item todo-item">
        <span>${todo.text}</span>
        <input type="text" class="edit" style="display: none;">
        <button data-id="${todo.id}" class="delete btn btn-danger">x</button>
        <button data-id="${todo.id}" class="complete btn btn-primary">✓</button>
      </li>`

      todoListSpan.innerHTML = li
    }).join('')

      todoListSpan.innerHTML = todosHTML
  }

  form.addEventListener('submit', e => {
    e.preventDefault()
    const text = newTodoInput.value

    fetch('/api/todos', {
      method: 'POST', 
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json'            
      }
    })
    .then(getTodos)
    .catch(err => console.error(err))
  })
  getTodos()
});