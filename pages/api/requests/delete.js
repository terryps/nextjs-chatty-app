import prisma from "lib/PrismaClient";
import { authenticate } from "middlewares/authenticate";

const handler = authenticate(async (req, res) => {
    switch (req.method) {
        case "POST":
            try {
                const deleteRequest = await prisma.friendRequest.deleteMany({
                    where: {
                        requesterId: req.body.requesterId,
                        addresseeId: req.cookieUserId,
                    },
                });

                return res.status(200).json({ message: "Success" })
            } catch(err) {
                return res.status(500).json({ message: err.message });
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
});

export default handler;