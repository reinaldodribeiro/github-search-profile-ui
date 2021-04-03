import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth/index.module';
import app from './modules/app.module';
import profiles from './modules/profiles/index.module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      app,
      auth,
      profiles,
    },
});
