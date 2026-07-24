// Guards both the API routes and the /mod/editor page.
// Single fixed account, checked against MOD_USERNAME / MOD_PASSWORD in .env.

export function requireModAuth(req, res, next) {
  if (req.session && req.session.isModAuthenticated) {
    return next()
  }
  return res.status(401).json({ success: false, message: "Not authenticated." })
}

// Same check but redirects to the login page instead of returning JSON.
// Used for the GET /mod/editor route in server.js.
export function requireModAuthPage(req, res, next) {
  if (req.session && req.session.isModAuthenticated) {
    return next()
  }
  return res.redirect("/mod")
}
