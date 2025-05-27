// Create the todo footer component
export function createTodoFooter(todoStore) {
  const footer = document.createElement('div');
  footer.className = 'todo-footer';
  
  // Create items left counter
  const itemsLeft = document.createElement('span');
  itemsLeft.className = 'items-left';
  
  // Create filter buttons
  const filterButtons = document.createElement('div');
  filterButtons.className = 'filter-buttons';
  
  const filters = [
    { name: 'All', value: 'all' },
    { name: 'Active', value: 'active' },
    { name: 'Completed', value: 'completed' }
  ];
  
  // Create buttons for each filter
  filters.forEach(filter => {
    const button = document.createElement('button');
    button.className = 'filter-btn';
    button.textContent = filter.name;
    button.dataset.filter = filter.value;
    
    // Set active class on the current filter
    if (filter.value === todoStore.getFilter()) {
      button.classList.add('active');
    }
    
    // Add event listener for filter change
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Set the filter in the store
      todoStore.setFilter(filter.value);
    });
    
    filterButtons.appendChild(button);
  });
  
  // Create clear completed button
  const clearCompleted = document.createElement('button');
  clearCompleted.className = 'clear-completed';
  clearCompleted.textContent = 'Clear completed';
  
  // Add event listener for clearing completed todos
  clearCompleted.addEventListener('click', () => {
    todoStore.clearCompleted();
  });
  
  // Update items left text
  function updateItemsLeft() {
    const activeCount = todoStore.getActiveTodosCount();
    itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
  }
  
  // Subscribe to store updates
  todoStore.subscribe(() => {
    updateItemsLeft();
    
    // Show/hide clear completed button
    const hasCompleted = todoStore.hasCompletedTodos();
    clearCompleted.style.display = hasCompleted ? 'block' : 'none';
  });
  
  // Initial update
  updateItemsLeft();
  clearCompleted.style.display = todoStore.hasCompletedTodos() ? 'block' : 'none';
  
  // Assemble the footer
  footer.appendChild(itemsLeft);
  footer.appendChild(filterButtons);
  footer.appendChild(clearCompleted);
  
  return footer;
}