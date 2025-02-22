import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const publicationSchema = mongoose.Schema({
    tittle: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
}, 
    {  
    versionKey: false,
    timestamps: true
})

export default mongoose.model('publication', publicationSchema)