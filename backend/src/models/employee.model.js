import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: [true, "Please provide an email"],
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
    },

    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    designation: {
      type: String,
      required: [true, "Please provide a designation"],
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      required: [true, "Please select a gender"],
    },
    course: {
      type: String,
      enum: ["MCA", "BCA", "BSC"],
      required: [true, "Please provide a course"],
    },
    img: {
      type: String,
      required: [true, "Please provide a image"],
    },
  },
  { timestamps: true }
);

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

employeeSchema.method("isPasswordCorrect", async function (password) {
  return await bcrypt.compare(password, this.password);
});

employeeSchema.method("generateAccessToken", function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.ACCESS_TOKEN_SECRET || "secret",
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "10d",
    }
  );
});

export const Employee = mongoose.model("Employee", employeeSchema);
