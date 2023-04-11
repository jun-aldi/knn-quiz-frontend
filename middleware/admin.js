import store from '@/store'
export default function ({ store, redirect }) {
  // Read the user role from the store
  const userRole = store.state.auth.user.roles

  // Check if the user has the admin role
  if (userRole !== 'admin') {
    // Redirect the user to the login page
    redirect('/mlebu')
  }
}
