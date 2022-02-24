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
                    throw ({ message: "This username isn't available. Please try another.", statusCode: 409 });
                }

                const password = await hash(req.body.password, 10);
                const user = await prisma.user.create({
                    data: {
                        ...req.body,
                        password: password,
                    },
                });
                return res.status(200).json({ message: "Success" });
            } catch(err) {
                const code = err.statusCode ? err.statusCode : 500;
                return res.status(code).json({ message: err.message });
            }
        default:
            return res.status(405).end(`Method ${req.method} is not allowed.`);
    }
}
