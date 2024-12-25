import moment from "moment";
export default {
  data() {
    return {
      store: useTodoStore(),
    };
  },
  methods: {
    async GetTaskList() {
      await this.store.GETLIST();
      console.log("hiiiiiiiii", this.store.TodoList);
      return this.store.TodoList;
    },
    getTime() {
      var date = new Date();
      var d =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      var t =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      return t + " " + d;
    },
  },
};
