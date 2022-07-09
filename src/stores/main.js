import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => {
        return {
            messageToEdit: '',
            messages: [],
        }
    },
    getters: {
        getMessageById: (state) => {
            return (messageId) => state.messages.find(element => element.id == messageId)
        },
        getItemById: (state) => {
            return (messageId, itemId) => state.getMessageById(messageId).items.find(element => element.id == itemId)
        }
    }
})