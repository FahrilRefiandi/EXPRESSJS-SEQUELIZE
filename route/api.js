const express = require("express");
const router = express.Router();

require('express-group-routes');

const AuthController = require("../app/controllers/AuthController");

// -----------------------------------------
const AccessToken = require("../app/middleware/accessTokenMiddleware");
const Verified = require("../app/middleware/mustVerifiedMiddleware");
// ---------------------------------------

// group with middleware



router.post("/login", AuthController.login);
router.post("/register", AuthController.register);


// with middleware accessToken
router.group((router) => {
  router.use(AccessToken.handle, Verified.handle);

  router.get("/users",  async (req, res) => {
  
    const { Client } = require("../models");
    
    try {
      const users = await Client.findAll();
      res.json({message: "Success", data: users});
    } catch (error) {
      res.json({ error: error.message });
    }
    
  });

  router.get("/user", AuthController.loginWithToken);

});


module.exports = { router };
