import state from './state.module';
import * as getters from './getters.module';
import * as mutations from './mutations.module';
import * as actions from './actions.module';

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
