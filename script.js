const taskInput = document.getElementById('taskInput');
const priorityInput = document.getElementById('priorityInput');
const dueDateInput = document.getElementById('dueDateInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');

addTaskBtn.addEventListener('click', () => {
    if (taskInput.value.trim() !== '') {
        const task = document.createElement('li');
        task.classList.add('task');
        task.textContent = taskInput.value;
        task.style.fontSize = `${16 + priorityInput.value * 2}px`;

        const dueDate = dueDateInput.value;
        if (dueDate) {
            const dueDateElement = document.createElement('span');
            dueDateElement.textContent = ` (Due: ${dueDate})`;
            task.appendChild(dueDateElement);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(task);
            saveTasks();
        });

        task.appendChild(deleteBtn);
        taskList.appendChild(task);
        taskInput.value = '';
        priorityInput.value = '';
        dueDateInput.value = '';
        saveTasks();
    }
});

taskList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        if (event.target.classList.contains('completed')) {
            event.target.classList.remove('completed');
        } else {
            event.target.classList.add('completed');
        }
        saveTasks();
    } else if (event.target.tagName === 'BUTTON') {
        taskList.removeChild(event.target.parentNode);
        saveTasks();
    }
});

toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(Array.from(taskList.children).map(task => ({
        text: task.textContent,
        priority: parseInt(window.getComputedStyle(task).fontSize) - 16,
        dueDate: task.querySelector('span')?.textContent?.split(' (Due: ')[1]
    }))));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(taskData => {
            const task = document.createElement('li');
            task.classList.add('task');
            task.textContent = taskData.text;
            task.style.fontSize = `${16 + taskData.priority * 2}px`;

            if (taskData.dueDate) {
                const dueDateElement = document.createElement('span');
                dueDateElement.textContent = ` (Due: ${taskData.dueDate})`;
                task.appendChild(dueDateElement);
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                taskList.removeChild(task);
                saveTasks();
            });

            task.appendChild(deleteBtn);
            taskList.appendChild(task);
        });
    }
}

loadTasks();
