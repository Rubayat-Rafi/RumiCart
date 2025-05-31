import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {type: string, required: true},
    name: {type: string, required: true},
    email: {type: string, required: true, unique: true},
    imageUrl: {type: string, required: true},
    cartItems: {type: Object, default: {}}
}, {minimize: false, timestamps: true});

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;