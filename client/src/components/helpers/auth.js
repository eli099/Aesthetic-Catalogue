// ? Get payload from the token stored in localstorage
export const getPayload = () => {
  const token = window.localStorage.getItem('aesthetic')
  if (!token) return
  // Get payload from token by return index 1
  const payload = token.split('.')[1]
  console.log('payload ->', payload)
  // Convert to JSON string, then JSON object
  // Return
  console.log('PAYLOAD ->', JSON.parse(atob(payload)))
  return JSON.parse(atob(payload))
}

// ? Check if user is authenticated (logged in or not)
export const userIsAuthenticated = () => {
  // De-structure expiry date from payload
  const payload = getPayload()
  // console.log('exp ->', payload)
  // Check payload exists
  if (!payload) return false
  // Get today's date and convert to seconds
  const currentTime = Math.floor(Date.now() / 1000)
  console.log('current time ->', currentTime)
  // Check if exp is in the future or not
  return currentTime < payload.exp
}