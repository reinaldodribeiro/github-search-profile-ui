import { StateAuth, User } from "@/models";
import VueJwtDecode from 'vue-jwt-decode';

export function setTokens(state: StateAuth, accessToken) {
  state.accessKey = accessToken;
  state.isLogged = true;
  localStorage.setItem('accessKey', state.accessKey ? state.accessKey : '');
}

export function setIsLogged(state: StateAuth, aux: boolean) {
  state.isLogged = aux;
}

export function setIsLoading(state: StateAuth, aux: boolean) {
  state.isLoading = aux;
}

export function setDataUser(state: StateAuth, dataUser: User) {
  state.dataUser = dataUser;
}

export function setDataUserByToken(state: StateAuth, accessToken: string) {
  const user = VueJwtDecode.decode(accessToken).sub;
  return setDataUser(state, user);
}
