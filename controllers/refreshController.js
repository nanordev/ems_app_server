import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const handleTokenRefresh = async (req, res) => {

  const cookies = req.cookies;
  if (!cookies?.jwt ) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (!foundUser) return res.sendStatus(403); //Forbidden

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,

    (error, decodedUser) => {
      if (error || foundUser.username !== decodedUser.username)
        return res.sendStatus(403);

      const accessToken = jwt.sign(
        { username: foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20m" }
      );

      res.json({ accessToken, username: foundUser.username });
    }
  );
};
