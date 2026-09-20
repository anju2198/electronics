export function saveAuth(result) {
  localStorage.setItem('volt_token', result.token)
  localStorage.setItem('volt_user', JSON.stringify(result.user))
  window.dispatchEvent(new Event('volt-auth-change'))
}

export function clearAuth() {
  localStorage.removeItem('volt_token')
  localStorage.removeItem('volt_user')
  window.dispatchEvent(new Event('volt-auth-change'))
}
