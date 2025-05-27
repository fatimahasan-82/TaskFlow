// Create the todo input component
export function createTodoInput(todoStore) {
  const inputContainer = document.createElement('div');
  inputContainer.className = 'todo-input-container';
  
  const input = document.createElement('input');
  input.className = 'todo-input';
  input.type = 'text';
  input.placeholder = 'What needs to be done?';
  input.setAttribute('aria-label', 'New todo task');
  
  const addButton = document.createElement('button');
  addButton.className = 'add-btn';
  addButton.textContent = 'Add';
  addButton.setAttribute('aria-label', 'Add task');
  
  // Add event listener for adding a new todo
  addButton.addEventListener('click', () => {
    addNewTodo(input, todoStore);
  });
  
  // Add event listener for pressing Enter key
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addNewTodo(input, todoStore);
    }
  });
  
  inputContainer.appendChild(input);
  inputContainer.appendChild(addButton);
  
  return inputContainer;
}

// Function to add a new todo
function addNewTodo(input, todoStore) {
  const text = input.value.trim();
  
  if (text) {
    todoStore.addTodo(text);
    input.value = '';
    input.focus();
  }
}