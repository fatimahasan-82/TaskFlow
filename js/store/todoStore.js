// TodoStore: Manages the application state and localStorage persistence
export class TodoStore {
  constructor() {
    this.todos = [];
    this.filter = 'all';
    this.listeners = [];
    
    // Load todos from localStorage
    this.loadTodos();
  }
  
  // Subscribe to store changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  // Notify all listeners of state changes
  notify() {
    this.listeners.forEach(listener => listener());
  }
  
  // Load todos from localStorage
  loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        this.todos = JSON.parse(saved);
      } catch (e) {
        this.todos = [];
        console.error('Failed to load todos from localStorage:', e);
      }
    }
  }
  
  // Save todos to localStorage
  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  
  // Add a new todo
  addTodo(text) {
    const todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    this.todos.push(todo);
    this.saveTodos();
    this.notify();
  }
  
  // Toggle a todo's completed status
  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );
    this.saveTodos();
    this.notify();
  }
  
  // Remove a todo
  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
    this.notify();
  }
  
  // Clear all completed todos
  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveTodos();
    this.notify();
  }
  
  // Set the current filter
  setFilter(filter) {
    this.filter = filter;
    this.notify();
  }
  
  // Get the current filter
  getFilter() {
    return this.filter;
  }
  
  // Get filtered todos based on current filter
  getFilteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }
  
  // Get all todos
  getAllTodos() {
    return this.todos;
  }
  
  // Get count of active todos
  getActiveTodosCount() {
    return this.todos.filter(todo => !todo.completed).length;
  }
  
  // Check if there are any completed todos
  hasCompletedTodos() {
    return this.todos.some(todo => todo.completed);
  }
  
  // Render todos (triggers notification to update UI)
  renderTodos() {
    this.notify();
  }
}