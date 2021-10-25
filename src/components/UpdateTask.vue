<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Task</label>
      <input type="text" v-model="text" name="text" placeholder="Add Task" />
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <input
        type="text"
        v-model="day"
        name="day"
        placeholder="Add Day & Time"
      />
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" v-model="reminder" name="reminder" />
    </div>

    <input type="submit" value="Update Task" class="btn btn-block" />
  </form>
</template>

<script>
export default {
  name: "UpdateTask",
  props: {
    id: String,
  },
  data() {
    return {
      text: "",
      day: "",
      reminder: false,
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      if (!this.text) {
        alert("Please add a task");
        return;
      }

      const updatedTask = {
        text: this.text,
        day: this.day,
        reminder: this.reminder,
      };

      await this.updateTask(this.id, updatedTask);

      this.$router.push("/");
    },
    async updateTask(id, task) {
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
    },
    async fetchTask(id) {
      const res = await fetch(`http://localhost:3000/tasks/${id}`);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    const task = await this.fetchTask(this.id);

    this.text = task.text;
    this.day = task.day;
    this.reminder = task.reminder;
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>