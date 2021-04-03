import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#24292e',
        secondary: '#2E90B9',
        accent: '#43A047',
        error: '#D32F2F',
        info: '#2E90B9',
        success: '#4CAF50',
        warning: '#FFCA28',
        gray: '#9FA2B4',
        black: '#252733',
        blue: '#151A6A',
        bluelight: '#F7F8FC',
      },
    },
  },
  icons: {
    iconfont: 'fa',
  },
});
