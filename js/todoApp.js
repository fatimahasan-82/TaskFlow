import { renderTodoList } from './components/todoList.js';
import { createTodoInput } from './components/todoInput.js';
import { createTodoFooter } from './components/todoFooter.js';
import { TodoStore } from './store/todoStore.js';

export function initTodoApp() {
  const appContainer = document.querySelector('#app');
  const todoStore = new TodoStore();
  
  const todoApp = document.createElement('div');
  todoApp.className = 'todo-app';
  
  const header = createAppHeader();
  const todoInput = createTodoInput(todoStore);
  const todoList = renderTodoList(todoStore);
  const todoFooter = createTodoFooter(todoStore);
  
  todoApp.appendChild(header);
  todoApp.appendChild(todoInput);
  todoApp.appendChild(todoList);
  todoApp.appendChild(todoFooter);
  
  appContainer.appendChild(todoApp);
  todoStore.renderTodos();
}

function createAppHeader() {
  const header = document.createElement('div');
  header.className = 'app-header';
  
  const title = document.createElement('h1');
  title.className = 'app-title';
  title.textContent = 'TaskFlow';
  
  const description = document.createElement('p');
  description.className = 'app-description';
  description.textContent = 'Transform your productivity with our intuitive task management system. Stay organized, focused, and accomplish more.';
  
  header.appendChild(title);
  header.appendChild(description);
  
  return header;
}