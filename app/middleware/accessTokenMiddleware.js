const { moment } = require("../../config/app")

class accessTokenMiddleware {
  async handle(req, res, next) {
    const { PersonalAccessTokens,Client } = require("../../models");
    const { Op } = require("sequelize");
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token not found",
      });
    } else if (!token.includes("Bearer")) {
      return res.status(401).json({
        status: false,
        message: "Token not valid",
      });
    }
    token = token.replace("Bearer ", "");

    const user = await PersonalAccessTokens.findOne({
      where: {
        token: token,
      }, include: [
        {
            model: Client,
        },
      ],
    });
    
    // check if token is expired
    if (user && moment().isAfter(user.expiresAt)) {
      return res.status(401).json({
        status: false,
        message: "Token expired",
      });
    }else if(!user){
      return res.status(401).json({
        status: false,
        message: "Token not valid",
      });
    }

    

    // update lastUsedAt
    await user.update({ lastUsedAt: 
      moment().format()
     });
    
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Token not valid or expired",
      });
    }

    const client = await Client.findByPk(user.tokenableId);
    

    // pass user to next middleware
    
    req.headers.user = client.dataValues;
    next();
  }
}

module.exports = new accessTokenMiddleware();
