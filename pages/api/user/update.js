import prisma from "lib/PrismaClient";
import { authenticate } from "middlewares/authenticate";

const handler = authenticate(async (req, res) => {
    switch(req.method) {
        case "POST":
            try {
                const updateUser = await prisma.user.update({
                    where: { id: req.cookieUserId },
                    data: {
                        fullname: req.body.fullname,
                        username: req.body.username,
                        about: req.body.about,
                        avatarUrl: String(req.body.avatarUrl),
                    },
                });
                return res.status(200).json({ message: "Success" });
            } catch(err) {
                console.log(err.message);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
});

export default handler;