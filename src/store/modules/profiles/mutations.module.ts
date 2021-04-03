import { Profile, ProfileFavorite, StateProfile } from "@/models/profiles";

export function setDataProfile(state: StateProfile, dataProfiles: Array<Profile>) {
  state.dataProfiles = dataProfiles;
}

export function setDataProfileFavorite(state: StateProfile, dataProfileFavorite: Array<ProfileFavorite>) {
    state.dataProfileFavorite = dataProfileFavorite;
}
