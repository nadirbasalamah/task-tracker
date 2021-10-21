<template>
  <input
    type="text"
    name="taskName"
    v-model="taskName"
    placeholder="Search for Task"
    @change="searchTask"
  />
</template>

<script>
export default {
  name: "SearchTask",
  data() {
    return {
      taskName: "",
    };
  },
  methods: {
    searchTask() {
      this.$emit("search-task", this.taskName);
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
</style>