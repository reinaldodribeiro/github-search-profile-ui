<template>
  <div class="home">
    <v-row class="ma-12" justify="center">
      <h1>Pesquisar usuários</h1>
    </v-row>

    <ProfileGitHub :is_favorite="false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProfileGitHub from "../components/ProfileGitHub.vue";
@Component({
  components: {
    ProfileGitHub,
  },
  mounted() {
    this.$store.dispatch("profiles/loadProfiles");
  },
})
export default class Dashboard extends Vue {}
</script>
