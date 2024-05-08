const { PersonalAccessTokens } = require("../models");

const {moment} = require("../config/app")

class Token {

  async generate(user) {
    let result = "";
    let length = 60;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    try {
        const [token, created] = await PersonalAccessTokens.findOrCreate({
            where: { tokenableId: user.id },
            defaults: {
                token: result,
                tokenableId: user.id,
                tokenableType: "Client",
                name: "Personal Access Token",
                expiresAt: moment().add(1, "month").format(),
            }
        });
    
        if (!created) {
            await "Bearer "+token.update({
                token: result,
                name: "Personal Access Token",
                expiresAt: moment().add(1, "month").format(),
            });
            // return token 
            return "Bearer "+token.token;
        } else {
            // return token
            return token.token;
        }
    } catch (error) {
        return { status: false, message: error.message };

    }

    
  }

}

module.exports = {
  Token : new Token(),
};
