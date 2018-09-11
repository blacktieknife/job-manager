import Vue from 'vue'
import App from './App.vue'
import Test from './Test.vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.min.css';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';
import 'document-register-element/build/document-register-element';
import vueCustomElement from 'vue-custom-element'

Vue.use(vueCustomElement)
Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.config.ignoredElements = [
    'vue-widget'
  ];

Vue.customElement('vue-widget', App);
