import { Router } from "express";
import { editProfileValidtor, updatePasswordValidator } from "../middlewares/user-validators.js";
import { editProfile, updatePassword } from "./user.controller.js";
const router = Router();

router.patch(
    "/updatePassword",
    updatePasswordValidator,
    updatePassword
)

router.put(
    "/updateProfile", 
    editProfileValidtor, 
    editProfile
)


export default router;