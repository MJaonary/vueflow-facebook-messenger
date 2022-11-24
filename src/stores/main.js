import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      layers: {
        messageToEdit: "",
        elements: {},
        messages: [],
      },
    };
  },
  getters: {
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
