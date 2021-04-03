export interface Profile {
    id: number;
    login: string;
    avatar_url: string;
    is_favorite: boolean;
    created_at: string;
    updated_at?: string;
}

export interface ProfileFavorite {
    id: number;
    login: string;
    avatar_url: string;
    is_favorite: true;
    created_at: string;
    updated_at?: string;
}

export interface StateProfile {
    dataProfiles: Array<Profile>,
    dataProfileFavorite: Array<ProfileFavorite>
}