import state from "./state.module";


export function getDataUser() {
  return state.dataUser;
}

export function getAccessKey() {
  return state.accessKey ? state.accessKey : localStorage.getItem("accessKey");
}

export function isLogged() {
  return state.isLogged;
}

export function isLoading() {
  return state.isLoading;
}
