import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose,
  userSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        index: true,
        default: null,
      },
      phoneNo: {
        type: String,
        index: true,
        required: true
      },
      password: {
        type: String,
        default: null,
      },
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
      },
      loginToken: {
        type: String,
        default: null,
      },
      loginTime: {
        type: Date,
        default: null,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model("user", userSchema);

export default userModel;
