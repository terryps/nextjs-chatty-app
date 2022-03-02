import prisma from "lib/PrismaClient";
import { hash } from "bcrypt";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            const { fullname, username, password } = req.body;
            try {
                if(username==="accounts") {
                    return res.status(403).json({ message: `The username ${username} is not available.` });
                }
                const search = await prisma.user.findMany({
                    where: { username: username, },
                });

                if(search?.length > 0) {
                    return res.status(409).json({ message: "This username isn't available. Please try another." });
                }

                const passwordHash = await hash(password, 10);
                const user = await prisma.user.create({
                    data: {
                        fullname: fullname,
                        username: username,
                        password: passwordHash,
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
