import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string | "aaabbbccc";

interface TokenData {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export const generateAccessToken = (information: TokenData) => {
  return jwt.sign(information, secret, { expiresIn: "1d" });
};

export const certifyAccessToken = (token: string): Promise<TokenData> => {
  return new Promise<TokenData>((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as TokenData);
      }
    });
  });
};
