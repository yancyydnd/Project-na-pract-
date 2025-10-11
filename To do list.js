// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');

    // Initial sample tasks (will be loaded/saved to localStorage)
    let tasks = [
        { text: 'Buy groceries', completed: false },
        { text: 'Finish work report', completed: true },
        { text: 'Exercise for 30 minutes', completed: false },
        { text: 'Call a friend', completed: false },
        { text: 'Read a book chapter', completed: false }
    ];

    // Load tasks from localStorage if available, otherwise use initial tasks
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }

    // Function to render the task list
    function renderTasks() {
        // Clear existing list
        taskList.innerHTML = '';

        // Create li for each task
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            if (task.completed) {
                li.classList.add('completed');
            }

            // Checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', function() {
                tasks[index].completed = this.checked;
                li.classList.toggle('completed', this.checked);
                saveTasks();
            });

            // Task text span
            const taskText = document.createElement('span');
            taskText.classList.add('task-text');
            taskText.textContent = task.text;

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', function() {
                tasks.splice(index, 1); // Remove task from array
                renderTasks(); // Re-render list
                saveTasks();
            });

            // Assemble li
            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(deleteBtn);

            // Add to list
            taskList.appendChild(li);
        });
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask() {
        const text = newTaskInput.value.trim();
        if (text === '') {
            alert('Please enter a task!'); // Simple validation
            return;
        }

        // Add to tasks array
        tasks.push({ text: text, completed: false });

        // Clear input
        newTaskInput.value = '';

        // Re-render and save
        renderTasks();
        saveTasks();
    }

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);

    // Allow Enter key to add task
    newTaskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial render
    renderTasks();
});