import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
        num: 5
    },
    getters: {
        doneCount(state) {
            return state.count++;
        }
    },
    mutations: {
        addCountFnc(state) {
            state.count++;
        },
        reduceCountFnc(state) {
            state.count--;
        }
    },
    actions: {
        addFunc(context, val) {
            context.commit('addCountFnc', val);
        },
        reduce(context) {
            context.commit('reduceCountFnc');
        }

    }
});
