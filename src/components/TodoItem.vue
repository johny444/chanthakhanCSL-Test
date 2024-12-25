<template>
  <div>
    <div><h1>TodoList</h1></div>
    <div v-for="task in tasks" :key="task.id">
      <v-row>
        <v-col cols="2">
          <v-checkbox
            v-model="task.completed"
            @change="updateTask(task)"
          ></v-checkbox>
        </v-col>
        <v-col align="start">
          <v-row class="my-4">
            <v-col class="pa-0" cols="10">
              <h4 :class="{ 'line-through': task.completed }">
                {{ task.title }}
              </h4>
            </v-col>

            <v-col class="pa-0" align="end">
              <v-icon
                color="red"
                style="font-size: 20px"
                icon="fa-regular fa-trash-can"
                @click="deleteTask(task.id)"
              ></v-icon>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { useTodoStore } from "@/stores/todoStore";

export default {
  components: {},
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      store: useTodoStore(),
      AlertStore: useAlertStore2(),
      loadingStore: useLoadingStore(),
    };
  },

  methods: {
    async updateTask(task) {
      // Call the store action to update the task completion status
      await this.store.updateTask(task);
    },
    async deleteTask(taskId) {
      this.AlertStore.openAlert(
        "Q",
        this.$t("ARE YOU SURE TO DELETE THIS TASK")
      ) // Open confirmation alert
        .then(async (res) => {
          this.loadingStore.openLoading(); // Open loading indicator
          await this.store.deleteTask(taskId);

          this.loadingStore.closeLoading(); // Close loading after task deletion
          this.AlertStore.openAlert("E", result.message); // Show error alert if needed
        });
    },
  },
};
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
