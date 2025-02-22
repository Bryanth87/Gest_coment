import { hash } from "argon2";
import User from "./user.model.js";

export const initializeAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN_ROLE" });

        if (!adminExists) {
            const hashedPassword = await hash(process.env.ADMIN_PASSWORD || "r3AlMadr1D15");

            const adminUser = {
                username: process.env.ADMIN_USERNAME || "bryanth87",
                email: process.env.ADMIN_EMAIL || "bryanth87@gmail.com",
                password: hashedPassword,
                role: "ADMIN_ROLE",
            };

            const admin = new User(adminUser);
            await admin.save();

            console.log("Admin creado");
        } else {
            console.log("El admin ya existe");
        }
    } catch (error) {
        console.error("Error al crear el admin:", error.message);
    }
};