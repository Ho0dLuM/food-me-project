module.exports = {
  noLoginRequired: (req, res, next) => {
    if (req.user) {
      res.redirect('/restaurants')
    } else {
      next()
    }
  },
  loginRequired: (req, res, next) => {
    if (!req.user) {
      req.flash('error', 'You must login to reach that page.')
      res.redirect('/login')
    } else {
      next()
    }
  },
  adminRequired: (req, res, next) => {
    if (!req.user.account.admin) {
      req.flash('error', 'Sorry, you don\'t have access to that page')
      res.redirect('/restaurants')
    } else {
      next()
    }
  }
}
