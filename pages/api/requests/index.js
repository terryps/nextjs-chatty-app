import prisma from "lib/PrismaClient";
import { authenticate } from "middlewares/authenticate";

const handler = authenticate(async (req, res) => {
    switch (req.method) {
        case "GET":
            try {
                const {friendshipAddressee} = await prisma.user.findUnique({
                    where: { id: req.cookieUserId },
                    include: {
                        friendshipAddressee: true,
                    },
                });
                
                const requesterIds = await friendshipAddressee.map(el => ({id: el.requesterId}));
                const requesterData = await prisma.user.findMany({
                    where: {
                        OR: requesterIds,
                    },
                    select: {
                        id: true,
                        fullname: true,
                        username: true,
                        avatarUrl: true,
                    }
                });
                
                return res.status(200).json({ requestData: requesterData });
            } catch(err) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
});

export default handler;