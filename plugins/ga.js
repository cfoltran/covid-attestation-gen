/* eslint-disable */

export default ({ app }) => {
  app.$ga.page({
    page: '/',
    title: 'Home page',
    location: window.location.href
  })
}