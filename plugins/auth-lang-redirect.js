import _ from 'lodash'
export default ({ app }) => {
  const redirect = _.clone(app.$auth.$storage.options.redirect)
  for (const key in redirect) {
    if (key !== 'home') {
      redirect[key] = app.localePath(redirect[key])
    } else {
      redirect.home = '/'
    }
  }
  app.$auth.$storage.options.redirect = _.clone(redirect)
}
