import mongoose, { Schema, Document } from 'mongoose';

export interface IApikey extends Document {
    api_key: String;
    username: String;
    status: Boolean;
    createdAt: Date;
    updatedAt: Date;
}

const apikeySchema: Schema = new Schema({
    api_key: {
      required: true,
      type: String,
    },
    username: {
      required: true,
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    createdAt: { type: Date },
    updatedAt: { type: Date }
});


apikeySchema.pre("save", function (next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export default mongoose.model<IApikey>('Apikey', apikeySchema);
