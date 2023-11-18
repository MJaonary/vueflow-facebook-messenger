import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      layers: {
        messageToEdit: "",
        elements: {},
        messages: [],
        default_values: {
          image:
            "https://images.unsplash.com/photo-1545703399-4313b14625d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80",
          video: "",
        },
      },
    };
  },
  getters: {
    getMessages: (state) => {
      return () => state.layers.messages;
    },
    getMessageById: (state) => {
      return (messageId) =>
        state.layers.messages.find((element) => element.id == messageId);
    },
    getItemById: (state) => {
      return (messageId, itemId) =>
        state
          .getMessageById(messageId)
          .items.find((element) => element.id == itemId);
    },
    getDefaultValues: (state) => {
      return () => state.layers.default_values;
    },
  },
  actions: {
    setMessageItems(messageId, items) {
      let result = this.layers.messages.find(
        (element) => element.id === messageId
      );
      result.items = items;
    },
  },
});
