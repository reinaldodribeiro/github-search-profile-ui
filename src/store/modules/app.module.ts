import { OptionSnackBar } from "@/models";

export interface AppState {
    sidebarStatus: boolean;
    showSnackBar: boolean;
    optionsSnackBar: {};
  }

const initialState: AppState = {
  sidebarStatus: true,
  showSnackBar: false,
  optionsSnackBar: {},
};

const getters = {
  getSidebarStatus(state: AppState) {
    return state.sidebarStatus;
  },
  getStatusSnackBar(state: AppState) {
    return state.showSnackBar;
  },
  getOptionsSnackBar(state: AppState) {
    return state.optionsSnackBar;
  },
};

const actions = {};

const mutations = {
  toggleSideBarStatus(state: AppState, status: boolean) {
    state.sidebarStatus = status;
  },
  callSnackBar(state: AppState, options: OptionSnackBar) {
    state.showSnackBar = true;
    state.optionsSnackBar = options;
    setTimeout(() => {
      state.showSnackBar = false;
      state.optionsSnackBar = {};
    }, 5000);
  },
  resetSnackBar(state: AppState) {
    state.showSnackBar = false;
    state.optionsSnackBar = {};
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
