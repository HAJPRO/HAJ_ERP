import { defineStore } from "pinia"

export const useCounterStore = defineStore("count", {
    state: () => {
        return { count: 25 }
    },
    actions: {
        increment(val = 1) {
            this.count += val
        }
    },
    getters: {
        db: (state) => {
            state.count * 2
        }
    }
})