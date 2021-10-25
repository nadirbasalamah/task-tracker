<template>
  <SearchTask v-show="!showAddTask" @search-task="searchTask" />
  <AddTask v-show="showAddTask" @add-task="addTask" />
  <Tasks
    @toggle-reminder="toggleReminder"
    @delete-task="deleteTask"
    :tasks="tasks"
  />
</template>

<script>
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";
import SearchTask from "../components/SearchTask";

import TaskService from "../services/task";

export default {
  name: "Home",
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
    SearchTask,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async addTask(task) {
      const data = await TaskService.addTask(task);
      this.tasks = [...this.tasks, data];
    },
    async searchTask(taskName) {
      const data = await TaskService.searchTask(taskName);
      this.tasks = data;
    },
    async deleteTask(id) {
      if (confirm("Are you sure?")) {
        const res = await TaskService.deleteTask(id);

        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert("Error deleting task");
      }
    },
    async toggleReminder(id) {
      const data = await TaskService.toggleReminder(id);
      this.tasks = this.tasks.map((task) => {
        task.id === id ? { ...task, reminder: !data.reminder } : task;
      });
    },
    async fetchTasks() {
      const data = await TaskService.fetchTasks();
      return data;
    },
    async fetchTask(id) {
      const data = await TaskService.fetchTask(id);
      return data;
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>

<style>
</style>