import { Schema, model} from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: true,
        maxLength: [30, "El nombre no puede exceder de 30 caracteres"]
    },
    surname:{
        type: String,
        required: true,
        maxLength: [30, "El apellido no puede exceder más de 30 caracteres"]
    },
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ["USER_ROLE", "ADMIN_ROLE"]
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)