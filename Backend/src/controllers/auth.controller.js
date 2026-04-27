import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

async function sendTokenResponse(user, res) {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET);
}

export const register = async (req, res) => {
  const { fullname, email, password, contact } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or contact already exists" });
    }

    const user = await userModel.create({ fullname, email, password, contact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
