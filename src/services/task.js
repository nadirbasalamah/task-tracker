class TaskService {
  constructor() {}

  static async fetchTasks() {
    const res = await fetch("api/tasks");
    const data = await res.json();
    return data;
  }

  static async fetchTask(id) {
    const res = await fetch(`http://localhost:3000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  static async addTask(task) {
    const res = await fetch("api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    return data;
  }

  static async searchTask(taskName) {
    const res = await fetch(`api/tasks?q=${taskName}`);
    const data = await res.json();
    return data;
  }

  static async updateTask(id, task) {
    const taskToUpdate = await this.fetchTask(id);

    const updTask = {
      ...taskToUpdate,
      text: task.text,
      day: task.day,
      reminder: task.reminder,
    };

    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
  }

  static async deleteTask(id) {
    const res = await fetch(`api/tasks/${id}`, {
      method: "DELETE",
    });
    return res;
  }

  static async toggleReminder(id) {
    const taskToToggle = await this.fetchTask(id);
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder,
    };

    const res = await fetch(`api/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();
    return data;
  }
}

module.exports = TaskService;
