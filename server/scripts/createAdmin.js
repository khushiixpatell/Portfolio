import "dotenv/config";
import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import prisma from "../src/lib/prisma.js";

const rl = readline.createInterface({
  input,
  output,
});

async function main() {
  const email = process.env.ADMIN_EMAIL;

  if (!email) {
    throw new Error("ADMIN_EMAIL is not set in .env");
  }

  console.log(`Creating admin account for: ${email}`);

  const password = await rl.question("Enter admin password: ");

  if (password.length < 12) {
    throw new Error(
      "Admin password must be at least 12 characters long."
    );
  }

  const confirmPassword = await rl.question(
    "Confirm admin password: "
  );

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: {
      email,
    },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      password: hashedPassword,
    },
  });

  console.log("Admin account created successfully.");
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    rl.close();
    await prisma.$disconnect();
  });