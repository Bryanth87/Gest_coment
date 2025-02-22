import { body } from "express-validator";
import { emailExists, usernameExists } from "../helpers/db-validators.js";
import { validarCampos} from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { handleErrors } from "./handle-errors.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El nombre es requirido"),
    body("email").notEmpty().withMessage("El correo es requerido"),
    body("email").isEmail().withMessage("El correo no es valido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
    }).withMessage(`La contraseña debe de tener cómo mínimo 8 cáracteres`),
    validarCampos,
    handleErrors
]

export const loginValidator = [ 
    body("email").optional().isEmail().withMessage("El correo es invalido"),
    body("username").optional().isString().withMessage("El nombre de usuario es invalido"),
    body("password").isLength({ min: 8 }).withMessage("La contraseña debe de tener mínimo 8 caracteres"),
    validarCampos,
    handleErrors
]

export const editProfileValidtor = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    body("username").optional().isString().withMessage("Nombre de usuario invalido"),
    body("email").optional().isEmail().withMessage("Correo invalido"),
    body("email").custom(emailExists),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    body("oldPassword").notEmpty().withMessage("The old password is required"),
    body("newPassword").notEmpty().withMessage("The new password is required"),
    body("newPassword").isStrongPassword({
        minLength: 8,
    }).withMessage(`La contraseña debe de tener cómo mínimo 8 cáracteres`),
    validarCampos,
    handleErrors
]