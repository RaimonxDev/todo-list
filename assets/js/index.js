let tasks = [
  {
    name: "Task 1",
    complete : false,
  },
  {
    name: "Task 2",
    complete : false,
  },
  {
    name: "Task 3",
    complete : false,
  }
]

const inputTask = document.querySelector('#inputTask');
const taskList = document.querySelector('#taskList');
const taskCount = document.querySelector('#taskTotal');
const taskComplete = document.querySelector('#taskComplete');

const taskTemplate = (task) => {
  return `
    <li class="flex items-center">
      
    <span class="min-w-[3rem] flex-0 px-2 text-gray-400" >${task.id}</span>
      
    <span class="flex-1 px-2 ${task.complete ? 'text-green-600 font-bold' : ''} ">${task.name}</span>
      
      <input name="${task.id}"
      onclick="isComplete(${task.id})" 
      class="mr-2" ${task.complete ? 'checked' : ''} type="checkbox">
      
      <button onclick="deleteTask(${task.id})" 
        class="w-5 h-5 bg-rose-500 text-white rounded-full inline-flex items-center justify-center p-3">
        X
      </button>
    </li>
  `
 }

document.addEventListener('DOMContentLoaded', () => {
  tasks = tasks.map((task) => { 
    return {
      id: generateID(),
      ...task
    }
  });
  rendererTask(); 
})

const addTask = () => {
  const taskName = inputTask.value;
  if (taskName) {
    const newTask = {
      id: generateID(),
      name: taskName,
      complete: false,
    }
    tasks.push(newTask);
    inputTask.value = '';
    rendererTask();
  }
  if(!taskName) {
    alert('Ingrese una tarea')
  }
};



const isComplete = (id) => {
  tasks = tasks.map((task) => {
   task.id === id ? task.complete = !task.complete : task.complete;
    return task;
  })
  rendererTask();
}

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  rendererTask();
}

const rendererTask = () => {
  const taskHTML = tasks.map((task) => {
    return taskTemplate(task)
  }).join('')
  taskList.innerHTML = taskHTML;
  updateTaskCount();
}

const updateTaskCount = () => {
  taskComplete.textContent = tasks.filter((task) => task.complete).length;
  taskCount.textContent = tasks.length;
}

const generateID = () => {
  return Math.floor(Math.random() * 1000);
}


