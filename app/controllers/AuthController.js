const Validator = require("validatorjs");
const bcrypt = require("bcryptjs");
const { Client } = require("../../models");
const { Token } = require("../Helpers");

class AuthController {
  async login(req, res) {
    try {
      const rules = {
        username: "required",
        password: "required",
      };
      const validation = new Validator(req.body, rules);

      if (validation.fails()) {
        throw {
          status: false,
          data: validation.errors.all(),
        };
      }

      const client = await Client.findOne({ where: { username: req.body.username } });

      if (!client) {
        throw {
          status: false,
          message: "User not found",
        };
      }

      if (!(await bcrypt.compare(req.body.password, client.password))) {
        throw {
          status: false,
          message: "Password not match",
        };
      }
      res.json({ status: true, token: await Token.generate(client), data: client });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async register(req, res) {
    try {
      const rules = {
        name: "required",
        username: "required|regex:/^[a-zA-Z0-9]+$/",
        email: "required|email",
        phone_number: "required|numeric",
        password: "required",
        password_confirmation: "required|same:password",
      };
      const validation = new Validator(req.body, rules);

      //   unique
      // count username

      if ((await Client.count({ where: { username: req.body.username } })) > 0) {
        validation.errors.add("username", "Username already taken");
      }

      // count email
      if ((await Client.count({ where: { email: req.body.email } })) > 0) {
        validation.errors.add("email", "Email already taken");
      }

      // count phone number
      if ((await Client.count({ where: { phoneNumber: req.body.phone_number } })) > 0) {
        validation.errors.add("phone_number", "Phone number already taken");
      }

      if (validation.fails()) {
        throw {
          status: false,
          message: "Validation error",
          data: validation.errors.all(),
        };
      }
      const client = await Client.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phone_number,
        password: await bcrypt.hash(req.body.password, 10),
      });
      res.json({
        status: true,
        message: "User created",
        data: client,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async loginWithToken(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const client = req.headers.user;
      res.json({ status: true, data: client });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new AuthController();
