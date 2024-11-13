document.getElementById("add-task").addEventListener("click", () => {
    document.getElementById("task-form").style.display = "flex";
});

document.getElementById("cancel-task").addEventListener("click", () => {
    document.getElementById("task-form").style.display = "none";
    clearFormFields();
});

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let chart;

// Inicializar aplicación cargando tareas existentes y actualizando el gráfico
updateTaskList();
updateChart();

// Guardar tarea y actualizar lista y gráfico
document.getElementById("save-task").addEventListener("click", () => {
    const name = document.getElementById("task-name").value;
    const date = document.getElementById("task-date").value;
    const time = document.getElementById("task-time").value;
    const duration = parseFloat(document.getElementById("task-duration").value);

    if (name && date && time && !isNaN(duration) && duration > 0) {
        tasks.push({ name, date, time, duration });
        saveTasks();
        updateTaskList();
        updateChart();
        document.getElementById("task-form").style.display = "none";
        clearFormFields();
    } else {
        alert("Por favor, complete todos los campos con valores válidos.");
    }
});

// Guardar tareas en localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskList() {
    const taskList = document.getElementById("tasks");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerText = `${task.name} - ${task.date} ${task.time} - ${task.duration} horas`;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Eliminar";
        deleteButton.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            updateTaskList();
            updateChart();
        };
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

function updateChart() {
    const ctx = document.getElementById("chart").getContext("2d");

    // Destruir el gráfico existente si ya se ha creado
    if (chart) {
        chart.destroy();
    }
    
    const taskLabels = tasks.map(task => `${task.name} (${task.date})`);
    const taskDurations = tasks.map(task => task.duration);
    
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: taskLabels,
            datasets: [{
                label: 'Duración (horas)',
                data: taskDurations,
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Duración (horas)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });

    console.log("Tareas en el gráfico:", taskLabels, taskDurations);
}

// Función para limpiar los campos del formulario
function clearFormFields() {
    document.getElementById("task-name").value = "";
    document.getElementById("task-date").value = "";
    document.getElementById("task-time").value = "";
    document.getElementById("task-duration").value = "";
}
