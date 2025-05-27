import { createTodoItem } from './todoItem.js';

// Create and render the todo list
export function renderTodoList(todoStore) {
  const listContainer = document.createElement('ul');
  listContainer.className = 'todo-list';
  
  // Subscribe to store updates
  todoStore.subscribe(() => {
    updateTodoList(listContainer, todoStore);
  });
  
  // Initial update
  updateTodoList(listContainer, todoStore);
  
  return listContainer;
}

// Update the todo list based on current store state
function updateTodoList(listContainer, todoStore) {
  // Clear the current list
  listContainer.innerHTML = '';
  
  const todos = todoStore.getFilteredTodos();
  
  if (todos.length === 0) {
    renderEmptyState(listContainer, todoStore.getFilter());
    return;
  }
  
  // Add all todos to the list
  todos.forEach(todo => {
    const todoItem = createTodoItem(todo, todoStore);
    listContainer.appendChild(todoItem);
  });
}

// Render empty state message
function renderEmptyState(container, filter) {
  const emptyState = document.createElement('div');
  emptyState.className = 'empty-state';
  
  let message = '';
  
  switch (filter) {
    case 'active':
      message = 'No active tasks found';
      break;
    case 'completed':
      message = 'No completed tasks found';
      break;
    default:
      message = 'No tasks found';
  }
  
  const icon = document.createElement('div');
  icon.textContent = '📝';
  icon.style.fontSize = '2rem';
  
  const text = document.createElement('p');
  text.textContent = message;
  
  emptyState.appendChild(icon);
  emptyState.appendChild(text);
  
  container.appendChild(emptyState);
}