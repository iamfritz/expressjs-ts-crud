import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
}

const roleSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a Role Name!"],
    unique: [true, "Role Name already exist"]
  },
});

export default mongoose.model < IRole > ("Role", roleSchema);
