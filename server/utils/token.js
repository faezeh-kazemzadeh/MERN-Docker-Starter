import jwt from "jsonwebtoken";

const generateAccessToken = (res, user) => {
  const token = jwt.sign( user , process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  return token;
};


const generateRefreshToken =(res,user)=>{
    const token = jwt.sign(user , process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: "30d",
    })
    res.cookie("refresh_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        });
    return token;
}

const generateTokens = (res, user) => {
   const payload = {
    _id: user._id,
    roles: user.roles || user.role || [], 
  };
    const accessToken = generateAccessToken(res, payload);
    const refreshToken = generateRefreshToken(res, payload);
    return { accessToken, refreshToken };
  };
  
  export { generateAccessToken, generateRefreshToken, generateTokens };