const passport = require('passport');

// Custom middleware function to check if a user is authenticated
const isAuthenticated = (req, res, next) => {
  // Use Passport's authentication functionality to check if user is authenticated
  if (req.isAuthenticated()) {
    // User is authenticated, proceed to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, redirect to login page or perform other actions
    res.redirect('/login');
  }
};

const requireAuth = (req, res, next) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // Check if the authenticated user matches the requested user ID
    if (req.params.userId && req.user.id.toString() !== req.params.userId) {
      // If the authenticated user doesn't match the requested user ID, redirect or return an error
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // If the user is authenticated and authorized, proceed to the next middleware or route handler
    return next();
  }

  // If the user is not authenticated, redirect or return an error
  return res.status(401).json({ error: "Unauthorized" });
};

module.exports = {
  isAuthenticated,
  requireAuth,
};

