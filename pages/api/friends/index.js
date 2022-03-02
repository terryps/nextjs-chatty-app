import prisma from "lib/PrismaClient";
import { authenticate } from "middlewares/authenticate";

const handler = authenticate(async (req, res) => {
    switch(req.method) {
        case "GET":
            try {
                const friendship = await prisma.friendship.findMany({
                    where: {
                        userId: req.cookieUserId,
                    },
                    select: { friendId: true, }
                });

                const friendIds = await friendship.map(el => ({id: el.friendId}));
                const friendsData = await prisma.user.findMany({
                    where: {
                        OR: friendIds,
                    },
                    select: {
                        id: true,
                        username: true,
                        fullname: true,
                        avatarUrl: true,
                        about: true,
                    }
                });

                return res.status(200).json({ friendsData: friendsData });
            } catch(err) {
                return res.status(500).json({ message: "Internal Server Error"});
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
});

export default handler;