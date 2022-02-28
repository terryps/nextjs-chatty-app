import prisma from "lib/PrismaClient";
import { hash } from "bcrypt";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            try {
                const search = await prisma.user.findMany({
                    where: { username: req.body.username, },
                });

                if(search?.length > 0) {
                    return res.status(409).json({ message: "This username isn't available. Please try another." });
                }

                const password = await hash(req.body.password, 10);
                const user = await prisma.user.create({
                    data: {
                        fullname: req.body.fullname,
                        username: req.body.username,
                        password: password,
                    },
                });
                return res.status(200).json({ message: "Success" });
            } catch(err) {
                return res.status(500).json({ message: "Internal Server Error"});
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
}
