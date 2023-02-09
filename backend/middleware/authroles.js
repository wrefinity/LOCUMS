import Authentication from "./authentication.js";
import CustomError from "../error/index.js";
import User from "../model/Users.js";

class AuthRoles {
  currentRole = "";
  Authenticate = async (req, res, next) => {
    const [authType, token] = req.headers.authorization.split(" ");
    if (authType !== "Bearer" || !token)
      throw new CustomError.UnauthenticatedError(
        "Token Required: Specifically Bearers Token"
      );
    try {
      let decoded = JWTAuthentication.isTokenValid({ token });
      const user = await User.findById(decoded.id.toString()).select(
        "-password"
      );
      if (!user) throw new CustomError.BadRequestError("No found found");
      this.currentRole = user.isAdmin;
      req.user = user;
      next();
    } catch (error) {
      if (error.name == "TokenExpiredError") {
        res.status(498).send({
          message: "Your token is expired!",
        });
      } else {
        throw new CustomError.UnauthenticatedError("Not authorized");
      }
    }
  };
  authorizePermissions = (req, res, next) => {
    console.log(this.currentRole);
    if (!req.user.role === this.currentRole) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
  authorizeOrganization = (req, res, next) => {
    console.log(this.currentRole);
    if (
      req.user.role === this.currentRole &&
      this.currentRole === process.env.COMPANY_ROLE
    ) {
      next();
    } else {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
  };
  authorizeDoctor = (req, res, next) => {
    console.log(this.currentRole);
    if (
      req.user.role === this.currentRole &&
      this.currentRole === process.env.DOCTOR_ROLE
    ) {
      next();
    } else {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
  };
  authorizePharmacy = (req, res, next) => {
    console.log(this.currentRole);
    if (
      req.user.role === this.currentRole &&
      this.currentRole === process.env.PHARMARCY_ROLE
    ) {
      next();
    } else {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
  };
}
export default new AuthRoles();
