import jwt from "jsonwebtoken";
import CustomError from "../error/index.js";

class Authentication {
  authenticate = (token, role) => {
    return new Promise((resolve, reject) => {
      jwt.verify(String(token), role, function (err, decoded) {
        if (err) {
          reject(new CustomError.BadRequestError("Invalid Token"));
          //   reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  };
  generateToken = (role, payload) => {
    let token = jwt.sign(payload, role);
    return token;
  };
}
export default new Authentication();
