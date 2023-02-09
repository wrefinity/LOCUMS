import express from "express";
import CategoryRepo from "../controller/Categories.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();
router
  .route("/")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    CategoryRepo.createCategory
  )
  .get(CategoryRepo.allCategory);
router
  .route("/:id")
  .delete(AuthRoles.authorizePermissions, CategoryRepo.deleteCategory)
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizePermissions,
    CategoryRepo.updateCategory
  );

export default router;
