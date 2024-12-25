<template>
  <div class="main">
    <v-container>
      <v-row>
        <v-col align="center">
          <h1>TODO LIST BY CHANTHAKHAN</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-form @submit.prevent="addTask">
          <v-col class="Container pa-4 bg-white">
            <v-text-field
              label="ENTER NEW TO DO"
              variant="outlined"
              v-model="newTask.title"
              placeholder="Task title"
              required
            ></v-text-field>
            <v-row>
              <v-col>
                <!-- Filter Button -->
                <v-btn @click="toggleFilter" color="primary">
                  {{
                    filterCompleted ? "Show All Tasks" : "Show Completed Tasks"
                  }}
                </v-btn>
              </v-col>
              <v-col align="end">
                <v-btn type="submit" color="green">Add todo</v-btn>
              </v-col>
            </v-row>
            <div class="py-3"></div>
            <!-- Render Filtered Tasks -->
            <todo-item :tasks="filteredTasks" />
          </v-col>
        </v-form>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { useTodoStore } from "@/stores/todoStore";
import TodoList from "@/components/TodoItem.vue";

export default {
  components: { TodoList },
  data() {
    return {
      newTask: {
        title: "",
        date: this.getTime(),
        completed: false,
      },
      filterCompleted: false, // Filter flag to toggle between all/completed tasks
    };
  },
  computed: {
    store() {
      return useTodoStore();
    },
    // Filtered list of tasks based on the filter flag
    filteredTasks() {
      if (this.filterCompleted) {
        return this.store.TodoList.filter((task) => task.completed);
      }
      return this.store.TodoList;
    },
  },
  methods: {
    async addTask() {
      console.log("add", this.newTask);
      this.newTask.date = this.getTime();
      if (this.newTask.title !== "") {
        await this.store.AddTask(this.newTask); // Add the task
        this.newTask = { title: "", completed: false }; // Reset input
        await this.store.GETLIST(); // Fetch updated task list
      }
    },
    toggleFilter() {
      // Toggle the filter flag to switch between completed tasks and all tasks
      this.filterCompleted = !this.filterCompleted;
    },
  },
  mounted() {
    this.store.GETLIST(); // Fetch the task list when the component mounts
    console.log("data", this.getTime());
  },
};
</script>

<style scoped>
.main {
  background-color: #cddae6;
  min-height: 100vh;
}
.Container {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  min-height: 80vh;
  min-width: 30vw;
}
</style>
