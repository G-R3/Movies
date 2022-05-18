import mongoose, { model, Types } from "mongoose";

const { Schema } = mongoose;

interface IList {
    title: string;
    description?: string;
    owner: Types.ObjectId;
}

const listSchema = new Schema<IList>(
    {
        title: {
            type: String,
            required: [true, "List title is required"],
        },
        description: {
            type: String,
            maxlength: [200, "Description max length exceeded"],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const List = model<IList>("List", listSchema);

export default List;
