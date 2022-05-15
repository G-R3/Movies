import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

interface IUser {
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: [true, "email is required"] },
        password: { type: String, required: [true, "password is required"] },
    },
    { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
