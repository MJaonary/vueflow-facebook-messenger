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
            "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          video:
            "https://drive.google.com/uc?export=view&confirm=yTib&id=1g8uCFA1CDKMvVsPwb8V8ayk-3Mop3_Hu",
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
