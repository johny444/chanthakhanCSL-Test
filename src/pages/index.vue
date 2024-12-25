<template>
  <div>
    <v-container>
      <v-row>
        <v-col align="center">
          <h1>TODO LIST BY CHANTHAKHAN</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-form @submit.prevent="addTask">
          <v-col class="Container pa-8">
            <v-text-field
              label="ENTER NEW TO DO"
              variant="outlined"
              v-model="newTask.title"
              placeholder="Task title"
              required
            ></v-text-field>
            <v-row>
              <v-col align="end">
                <v-btn type="submit">Add todo</v-btn>
              </v-col>
            </v-row>
            <todo-item :tasks="store.TodoList" />
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
        completed: false,
      },
    };
  },
  computed: {
    store() {
      return useTodoStore();
    },
  },
  methods: {
    async addTask() {
      console.log("add", this.newTask);
      if (this.newTask.title !== "") {
        await this.store.AddTask(this.newTask); // Add the task
        this.newTask = { title: "", completed: false }; // Reset input
        await this.store.GETLIST(); // Fetch updated task list
      }
    },
  },
  mounted() {
    this.store.GETLIST(); // Fetch the task list when the component mounts
  },
};
</script>

<style scoped>
.Container {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  min-height: 80vh;
  min-width: 30vw;
}
</style>
