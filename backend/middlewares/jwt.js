import jwt from "jsonwebtoken";

const createtokenandsavecookie = (userid, res)=>{
  const token = jwt.sign({userid}, process.env.JWT_TOKEN, {
    expiresIn: "5d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    samesite: "Lax",
  });
  return token;
};

export default createtokenandsavecookie;