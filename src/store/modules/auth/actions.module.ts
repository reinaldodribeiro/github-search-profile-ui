import { HttpClient } from "@/services/http-client";
import VueJwtDecode from 'vue-jwt-decode';
import { getUrl } from "@/util/helpers";
import { Login, Register } from "@/models";
import store from "@/store";
import router from "@/router";

export function isLogged(context) {
  const accesskey = context.getters.getAccessKey;

  let user = null;
  if(accesskey) {
    user = VueJwtDecode.decode(accesskey).sub;
  }
 
  const idUser = user ? user?.id_user : "notlogged";
context.dispatch("startLoading");
  return new Promise((resolve: any, reject: any) => {
    HttpClient.get(`user/${idUser}`).subscribe(
      (response: any) => {
        context.commit("setIsLogged", true);
        context.commit("setDataUser", response.data);
        context.dispatch("stopLoading");
        resolve();
      },
      error => {
        context.commit("setIsLogged", false);
        context.dispatch("stopLoading");
        reject();
      }
    );
  });

}

export function startLoading(context: any) {
  context.commit("setIsLoading", true);
}

export function stopLoading(context: any) {
  context.commit("setIsLoading", false);
}

export function login(context: any, data: Login) {
  context.dispatch("startLoading");
  return HttpClient.post(getUrl('login'), data).subscribe(
    response => {
      if(response.accessToken) {
        router.push("home");
        context.commit("setTokens", response.accessToken);
        context.commit("setDataUserByToken", response.accessToken);
        context.commit("setIsLogged", true);
        context.dispatch("stopLoading");
      }
    },
    error => {
      context.dispatch("stopLoading");
      store.commit('app/callSnackBar', {
        type: 'error',
        directionY: 'bottom',
        text: `${error.message}`,
      });
      return error;
    }
  );
}

export function register(context: any, data: Register) {
  context.dispatch("startLoading");
  return HttpClient.post(getUrl('user'), data).subscribe(
    response => {
      store.commit('app/callSnackBar', {
        type: 'success',
        directionY: 'top',
        directionX: 'right',
        text: `Usuário cadastrado com sucesso !`,
      });
      context.dispatch('login', data);
    },
    error => {
      context.dispatch("stopLoading");
      const errors = error.errors;
      Object.keys(errors).map(key => {
        errors[key].map(message => {
          store.commit('app/callSnackBar', {
            type: 'error',
            directionY: 'bottom',
            text: `${message}`,
          });
        })
      })
      return error;
    }
  );
}

export function logout(context: any) {
  return HttpClient.post(getUrl('logout'), {}).subscribe(
    response => {
      localStorage.removeItem("accessKey");
      window.location.href = "login";
      context.commit("setIsLogged", false);
    }
  );
  
}
