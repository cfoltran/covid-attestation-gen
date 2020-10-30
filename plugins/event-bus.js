import Vue from 'vue'

export default (context, inject) => {
  const bus = new Vue()
  inject('bus', bus)
}
