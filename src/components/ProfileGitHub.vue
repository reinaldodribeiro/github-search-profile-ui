<template>
  <v-container :style="screen >= 480 ? 'padding: 30px' : ''">
    <v-card elevation="12" style="background-color: #f7f8fc">
      <v-row class="flex-center-profile">
        <v-col col="12">
          <img
            src="../assets/logo_write.png"
            style="margin-bottom: 12px"
            alt="Logotipo Github"
            width="110px"
          />
          <v-form
            v-if="!is_favorite"
            v-model="valid"
            ref="form"
            onSubmit="return false;"
          >
            <v-text-field
              style="height: 60px"
              label="Pesquisar usuário"
              outlined
              required
              v-model="user"
              append-icon="mdi-magnify"
              @click:append="search"
              id="user"
            ></v-text-field>
          </v-form>
        </v-col>

        <v-card
          v-for="profile in is_favorite ? dataProfilesFavorite : dataProfiles"
          :key="profile.id"
          class="cardProfile"
          :elevation="profile.id === id_hover ? 4 : 0"
          outlined
        >
          <v-row
            @mouseover="setElevationCard(profile.id)"
            @mouseout="setElevationCard(0)"
            justify="center"
          >
            <v-col :cols="12">
              <v-card-title style="justify-content: left" class="title">
                <img
                  :src="profile.avatar_url"
                  class="img-profile"
                  width="60"
                  height="60"
                />
                <span style="margin-left: 20px; margin-top: 10px">
                  <img
                    src="../assets/icon_github.png"
                    class="img-git"
                    alt="Logotipo Github"
                    width="20px"
                  />
                  {{ profile.login }} <br />
                  <b style="font-size: 12px">{{ profile.id }}</b></span
                >
              </v-card-title>
              <div
                class="favorite"
                @mouseover="setHoverFavorite(profile.id)"
                @mouseout="setHoverFavorite(0)"
              >
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      style="float: right"
                      icon
                      @click="setFavorite(profile.id, !profile.is_favorite)"
                      :color="
                        profile.is_favorite || profile.id == id_hover_favorite
                          ? '#c09610'
                          : 'grey'
                      "
                      large
                    >
                      <v-icon>mdi-star</v-icon>
                    </v-btn>
                  </template>
                  <span>{{
                    profile.is_favorite ? "Desfavoritar" : "Favoritar"
                  }}</span>
                </v-tooltip>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-row>

      <v-alert
        v-if="
          is_favorite
            ? dataProfilesFavorite.length === 0
            : dataProfiles.length === 0
        "
        dense
        type="info"
      >
        <span v-if="is_favorite">Nenhum usuário favoritado</span>
        <span v-else
          >Você ainda não pesquisou por nenhum usuário do Github !</span
        >
      </v-alert>
    </v-card>
  </v-container>
</template>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  name: "layout-auth",
  props: ["is_favorite"],
  data: () => ({
    id_hover: 0,
    id_hover_favorite: 0,
    user: "",
    screen: window.innerWidth,
  }),
  mounted() {
    window.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        if (this.$route.name === "Inicio") {
          this.search();
        }
      }
    });
  },
  computed: {
    dataProfiles() {
      return this.$store.getters["profiles/getDataProfiles"];
    },
    dataProfilesFavorite() {
      return this.$store.getters["profiles/getDataProfilesFavorite"];
    },
  },
  methods: {
    setElevationCard(value: number) {
      this.id_hover = value;
    },
    setHoverFavorite(value: number) {
      this.id_hover_favorite = value;
    },
    async search() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("profiles/searchProfile", this.user);
      }
    },
    setFavorite(id: number, favorite: boolean) {
      const data = { id, is_favorite: this.is_favorite, favorite };
      this.$store.dispatch("profiles/setFavorite", data);
    },
  },
});
</script>

<style lang="scss">
.cardProfile {
  align-self: center;
  justify-content: center;
  width: 100%;
  padding: 7px;
  margin-top: 12px;
}

form fieldset {
  border: thin solid rgba(0, 0, 0, 0.12) !important;
}
.title {
  border-radius: 6px 6px 0 0;
  border-color: #24292e;
  background-color: white;
}
.content-card {
  padding: 20px;
}
.flex-center-profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px;
}
.img-profile {
  max-width: 60px;
  min-width: 60px;
  border-radius: 50%;
}
.favorite {
  flex: 1;
  float: right;
  margin-top: -75px;
  margin-right: 10px;
}
</style>
