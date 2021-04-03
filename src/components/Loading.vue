<template>
  <v-overlay :z-index="zIndex" :value="overlay">
    <v-progress-circular
      indeterminate
      color="primary"
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Loading',
  data: () => ({
    overlay: true,
    zIndex: 9,
  }),
});
</script>

<style lang="scss" scoped>
  .wrapper-loading {
    /* SVG spinner icon animation */
    .spinner {
      -webkit-animation: rotate 2s linear infinite;
              animation: rotate 2s linear infinite;
      z-index: 2;
      margin: 60px auto 0;
      display: block;
      width: 70px;
      height: 70px;
    }

    .spinner .path {
      stroke: #cccccc;
      stroke-linecap: round;
      -webkit-animation: dash 1.5s ease-in-out infinite;
              animation: dash 1.5s ease-in-out infinite;
    }

    @-webkit-keyframes rotate {
      100% {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
      }
    }

    @keyframes rotate {
      100% {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
      }
    }

    @-webkit-keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }

      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }

      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }

      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }

      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  }
</style>
