import Admin from "../models/Admin.js";
import { hashPassword } from "./hashPassword.js";

const createAdminIfNotExists = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    console.log("✅ Admin already exists");
    return;
  }

  const hashedPassword = await hashPassword(password);

  await Admin.create({
    email,
    password: hashedPassword,
  });

  console.log("🔥 Admin auto-created successfully");
};

export default createAdminIfNotExists;
