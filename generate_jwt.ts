import jwt from "jsonwebtoken";
import { readFileSync } from "fs";
import { join } from "path";

// 🔐 Privater Schlüssel (RSA) laden
const privateKey = readFileSync(join(__dirname, "./keys_authorizer/jwtRS256.key"), "utf8");

// 📦 Payload definieren
const payload = {
  sub: "user123",
  iss: "custom-issuer",
  role: "user",
};

// 🕓 Optional: Optionen setzen
const options: jwt.SignOptions = {
  algorithm: "RS256",
  expiresIn: "1h",
};

// 🪙 Token erzeugen
const token = jwt.sign(payload, privateKey, options);

console.log("🔐 Bearer Token:\n", `Bearer ${token}`);
