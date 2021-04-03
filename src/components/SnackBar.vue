<template>
  <div class="text-center ma-2">
    <v-snackbar
      :color="getOptions.type ? getOptions.type : ''"
      :center="!getOptions.directionX || getOptions.directionX == 'center'"
      :left="getOptions.directionX && getOptions.directionX == 'left'"
      :right="getOptions.directionX && getOptions.directionX == 'right'"
      :top="!getOptions.directionY || getOptions.directionY == 'top'"
      :bottom="!getOptions.directionY && getOptions.directionY == 'bottom'"
      timeout="20000"
      v-model="showSnackBar"
    >
      {{ getOptions.text ? getOptions.text : "" }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="resetSnackBar">
          <v-icon color="white darken-2"> mdi-close </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "SnackBar",
  computed: {
    getOptions() {
      return this.$store.getters["app/getOptionsSnackBar"];
    },
    showSnackBar() {
      const status = this.$store.getters["app/getStatusSnackBar"];
      return status;
    },
  },
  methods: {
    resetSnackBar() {
      this.$store.commit("app/resetSnackBar");
    },
  },
};
</script>
