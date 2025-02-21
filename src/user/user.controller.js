import { hash, verify } from "argon2";
import User from "./user.model.js";

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { newPassword } = req.body;

        const user = await User.findById(uid);

        const matchOldAndNewPassword = await verify(user.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
};
 
export const editProfile = async (req, res) => {
    try {
        const { usuario } = req;
        const data = req.body;
                                        // El usuario edita su propio perfil
        if (data.password) {
            data.password = await hash(data.password); 
        }

        const user = await User.findByIdAndUpdate(usuario._id,  data, { new: true });

        return res.status(200).json({
            message: "Perfil actualizado",
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al actualizar perfil",
            error: err.message
        });
    }
}