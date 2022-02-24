import prisma from "lib/PrismaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            const userId = req.body.userId;
            try {
                const {friendshipAddressee} = await prisma.user.findUnique({
                    where: { id: userId },
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
                    }
                });
                
                return res.status(200).json({ requestData: requesterData });
            } catch(err) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
}