const itemForm = document.querySelector('#add-items');
const formInput = document.querySelector('#todo-item');
const todoList = document.querySelector('#todo-list');

function updateLocalStorage(todoList) {
  /*
    Accepts an array-like obj as an arg,
    Converts that obj into text localStorage
    can read, then pushes that item onto 
    localStorage
  */
  const allListItems = [];
  try {
    for (let child of todoList.children) {
      allListItems.push(child.outerHTML);
    }
  } catch(TypeError) {
    for (let child of todoList) {
      allListItems.push(child);
    }
  }
  localStorage.setItem('todoList', JSON.stringify(allListItems));
}

function removeFromLocalStorage(itemToRemove) {
  /*
    Accepts an HTML element as an arg,
    gets the current todo list from localStorage,
    removes the arg element from the todo list &
    adds the new list to localStorage
  */
  const currentTodoList = JSON.parse(localStorage.getItem('todoList'));
  for (let item of currentTodoList) {
    if (itemToRemove.outerHTML === item) {
      currentTodoList.splice(currentTodoList.indexOf(item),1);
      updateLocalStorage(currentTodoList);
    }
  }
}

function readLocalStorage(todoList) {
  /*
    Accepts a list as an arg. Attempts to
    retrieve the todo list from local storage,
    if it is successful: appends to given list,
    otherwise returns
  */
  try {
    const myChildren = JSON.parse(localStorage.getItem('todoList'));
    for (let child of myChildren) {
      newListItem = document.createElement('li');
      todoList.appendChild(newListItem);
      newListItem.outerHTML = child;
    }
  } 
  catch(TypeError) {
    return;
  }
}

function addListItem(parentList, input) {
  /* 
    Given an input, and a list-element,
    creates a new list item, and appends it as
    a child to the given element.
  */
  const newItem = document.createElement('li');
  const newCompletedBtn = document.createElement('button');
  const newRemoveBtn = document.createElement('button');
  
  newItem.textContent = input.value;
  newCompletedBtn.textContent = 'Complete';
  newRemoveBtn.textContent = 'Remove';

  newCompletedBtn.classList.add('completed');
  newRemoveBtn.classList.add('removed');

  newItem.prepend(newCompletedBtn);
  newItem.appendChild(newRemoveBtn);
  parentList.appendChild(newItem);
}

itemForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addListItem(todoList,formInput);
  formInput.value = '';
  updateLocalStorage(todoList);
});

todoList.addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    if (event.target.classList.contains('removed')) {
      removeFromLocalStorage(event.target.parentElement);
      event.target.parentElement.remove();
    }
    else if (event.target.classList.contains('completed')) {
      event.target.parentElement.classList.toggle('completed-item');
      updateLocalStorage(todoList);
    }
  }
});

readLocalStorage(todoList);