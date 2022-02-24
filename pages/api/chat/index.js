import prisma from "lib/PrismaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            const { id1, id2 } = req.body;
            try {
                const chatRoom = await prisma.chatRoom.findMany({
                    where: {
                        OR: [
                            { participant1Id: id1, participant2Id: id2, },
                            { participant1Id: id2, participant2Id: id1, },
                        ],
                    },
                });
                const chatLog = await prisma.chat.findMany({
                    where: { roomId: chatRoom?.id },
                    orderBy: {
                        createdAt: "asc",
                    },
                });

                return res.status(200).json({ chatData: chatLog });
            } catch(err) {
                return res.status(500).json({ message: "Internal Server Error"});
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
}