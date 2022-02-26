import { serialize } from "cookie";

export const logout = (handler) => async ({req, res}) => {
  res.setHeader("Set-Cookie",
    serialize("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/"
    })
  );

  return handler(req, res);
}