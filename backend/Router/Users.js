import express from "express";
import UserRepo from "../controller/Users.js";
import AuthRoles from "../middleware/authroles.js";
const router = express.Router();

router
  .route("/register")
  .post(UserRepo.regPost)
  .get(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    UserRepo.getUsers
  );
router.route("/register/company").post(UserRepo.regCompany);
router
  .route("/:id")
  .get(AuthRoles.Authenticate, UserRepo.getUser)
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    UserRepo.deleteUsers
  )
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    UserRepo.updateUser
  );

router.route("/login").post(UserRepo.login_post);
router.post("/changePassword", AuthRoles.Authenticate, UserRepo.changePassword);
router.post("/changeImage", AuthRoles.Authenticate, UserRepo.changeImage);

export default router;
