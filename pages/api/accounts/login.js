import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "lib/PrismaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        username: req.body.username,
                    },
                    select: {
                        id: true,
                        username: true,
                        password: true,
                    },
                });

                const match = await compare(req.body.password, user.password);

                if(match) {
                    const claims = { sub: user.id, username: user.username };
                    const accessToken = jwt.sign(
                        claims,
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '1d' }
                    );
                    res.setHeader('Set-Cookie', [
                        cookie.serialize("accessToken", accessToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                            sameSite: "strict",
                            maxAge: 3600,
                            path: "/",
                        }),
                    ]);

                    return res.status(200).json({message: "Success"});
                }

                return res.status(401).json({ message: "Username or password is incorrect."});
            } catch(err) {
                return res.status(500).json({ message: "Internal Server Error"});
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
}