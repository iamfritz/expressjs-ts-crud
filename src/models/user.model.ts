import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: String;
    password: String;
    name: String;
    roles: Array<String>;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    email: {      
      type: String,
      required: [true, "Please provide an Email!"],
      unique: [true, "Email Exist"],
    },
    password: {      
      type: String,
      required: [true, "Please provide a password!"],
    },
    name: {
      required: true,
      type: String,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    createdAt: { type: Date },
    updatedAt: { type: Date },
  }
);

userSchema.pre("save", function (next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export default mongoose.model < IUser > ("User", userSchema);