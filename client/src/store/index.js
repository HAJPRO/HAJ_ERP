import { createStore } from "vuex";
// import modules from './modules';
import WeavingPlan from "./modules/Weaving/weaving_plan"
import Auth from "./modules/Auth/auth"
export default createStore({
  namespaces: true,
  modules: {
    Auth, WeavingPlan
  }
});
