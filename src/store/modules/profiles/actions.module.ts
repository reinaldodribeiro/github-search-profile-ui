import { HttpClient } from "@/services/http-client";
import store from "@/store";
import { getUrl } from "@/util/helpers";

export function loadProfiles(context: any, is_favorite=false) {
    const url = 'profiles?per_page=100'
    store.dispatch("auth/startLoading");
    return HttpClient.get(`${url}${ is_favorite ? '&is_favorite=true' : ''}`).subscribe(
        response => {
            if(is_favorite) {
                context.commit('setDataProfileFavorite', response.data)
            }else{
                context.commit('setDataProfile', response.data)
            }
            store.dispatch("auth/stopLoading");
        }, error => {
            console.log(error);
            store.dispatch("auth/stopLoading");
            return error;
        }
    )
}

export function searchProfile(context: any, user: string) {
    return HttpClient.get(getUrl(`profile/search/${user}`)).subscribe(
        response => {
            context.dispatch('loadProfiles');
        }, error => {
            store.commit('app/callSnackBar', {
                type: 'error',
                directionY: 'top',
                text: `${"Usuário não encontrado !"}`,
            });
            return error;
        }
    )
}

interface DataFavorite {
    id: number;
    is_favorite: boolean;
    favorite: boolean;
}

export function setFavorite(context: any, data: DataFavorite) {
    return HttpClient.patch(getUrl(`profiles/${data.id}`), {is_favorite: data.favorite}).subscribe(
        response => {
            if(response.status) {
                context.dispatch('loadProfiles', data.is_favorite);
            }
        }, error => {
            store.commit('app/callSnackBar', {
                type: 'error',
                directionY: 'top',
                text: `${"Não foi possivel executar a ação"}`,
            });
        }
    )
}
