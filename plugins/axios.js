export default function ({ app, $axios, redirect }) {
  $axios.interceptors.response.use(null, (data) => {
    if (data.response.status === 401) {
      app.store.dispatch('logout')
      return redirect(app.localePath('login'))
    }
  })
}
