export default ({ app, redirect }) => {
  if (app.store.getters.isAuthenticated) {
    return redirect('/')
  }
}
