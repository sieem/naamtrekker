import type { Secret } from "jsonwebtoken";

export const secretKey = () => process.env.SECRET_KEY as Secret;