const passport = require('passport');

// Custom middleware function to check if a user is authenticated
const isAuthenticated = (req, res, next) => {
  // Use Passport's authentication functionality to check if user is authenticated
  if (req.isAuthenticated()) {
    // User is authenticated, proceed to the next middleware or route handler
    return next();
  } else {
    // User is not authenticated, redirect to login page or perform other actions
    res.redirect('/login');
  }
};

module.exports = {
  isAuthenticated,
};