// inject global axios instance as http client to Model
import { Model } from 'vue-api-query';

export default function ({ $axios, $config }, inject) {
  Model.$http = $axios;
  Model.$config = $config;
}
