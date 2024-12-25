// @ts-ignore
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
export const useTodoStore = defineStore("TodoStore", {
  state: () => ({
    TodoList: ref([]),
  }),
  getters: {
    // getTodoList: (state) => state.TodoList,
  },
  actions: {
    async GETLIST() {
      const respone = await axios
        .get("http://localhost:3001/tasks")
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
          return err;
        });
      // console.log("respone", respone);
      this.TodoList = respone.data;
      return respone;
    },
    async AddTask(body: any) {
      const respone = await axios
        .post("http://localhost:3001/tasks", body)
        .catch((err) => {
          console.log("ERRO form fetchQuestion", err);
          return err;
        });
      // console.log("respone", respone);
      this.TodoList = respone.data;
      return respone;
    },
    async deleteTask(taskId: any) {
      try {
        await axios.delete(`http://localhost:3001/tasks/${taskId}`); // Send DELETE request
        // After deleting, filter out the task from the list
        this.TodoList = this.TodoList.filter((task) => task.id !== taskId);
      } catch (err) {
        console.log("Error deleting task", err);
      }
    },
    async updateTask(task: any) {
      console.log("Updating task:", task);
      try {
        // Ensure you're passing the full task object, including the id
        const updatedTask = { ...task }; // Copy existing task data

        // Perform the PUT request to update the task on the server
        const response = await axios.put(
          `http://localhost:3001/tasks/${task.id}`, // Use the task's ID in the URL
          updatedTask // Send the updated task object (including its id)
        );

        console.log("Updated task response:", response.data); // Check the backend response

        // Find and update the task in the frontend state (TodoList)
        const index = this.TodoList.findIndex((t) => t.id === task.id);
        if (index !== -1) {
          this.TodoList[index] = response.data; // Update the task with the backend response
        }
      } catch (err) {
        console.log("ERROR updating task", err);
      }
    },
  },
});
