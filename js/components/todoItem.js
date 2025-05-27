// Create a todo item
export function createTodoItem(todo, todoStore) {
  const item = document.createElement('li');
  item.className = 'todo-item';
  item.dataset.id = todo.id;
  
  // Create checkbox
  const checkbox = document.createElement('div');
  checkbox.className = 'todo-checkbox';
  if (todo.completed) {
    checkbox.classList.add('checked');
  }
  
  // Create todo text
  const text = document.createElement('span');
  text.className = 'todo-text';
  text.textContent = todo.text;
  if (todo.completed) {
    text.classList.add('completed');
  }
  
  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.setAttribute('aria-label', 'Delete task');
  deleteBtn.innerHTML = '&times;';
  
  // Add event listeners
  checkbox.addEventListener('click', () => {
    todoStore.toggleTodo(todo.id);
  });
  
  deleteBtn.addEventListener('click', () => {
    // Add a subtle animation before removing
    item.style.opacity = '0';
    item.style.transform = 'translateX(10px)';
    item.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // Remove after animation completes
    setTimeout(() => {
      todoStore.removeTodo(todo.id);
    }, 300);
  });
  
  // Assemble the item
  item.appendChild(checkbox);
  item.appendChild(text);
  item.appendChild(deleteBtn);
  
  return item;
}