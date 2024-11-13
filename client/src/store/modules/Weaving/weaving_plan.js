import { SaleLegalService } from "../../../ApiServices/Sale/saleLegal.service";

const WeavingPlanModule = {
    namespaces: true,
    state: {
        items: { department: "seewre" },
        data: { name: "sdsdd" }
    },
    getters: {
        newData(state, { name: sotuv }) {
            return state.data.name = "yangi"
        }
    },

    mutations: {
        GET_ALL(state, payload) {
            state.items = payload;
        },
    },
    actions: {
        async getAll({ commit }, isActive) {
            try {
                const data = await SaleLegalService.getAll(isActive);
                commit("GET_ALL", data.data ? data.data : []);
            } catch (error) {
                return error.message;
            }
        },
    },
};

export default WeavingPlanModule;
