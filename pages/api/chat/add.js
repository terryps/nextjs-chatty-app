import prisma from "lib/PrismaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            const { content, senderId, recipientId } = req.body;
            try {
                const searchRoom = await prisma.chatRoom.findMany({
                    where: {
                        OR: [
                            {
                                participant1: senderId,
                                participant2: recipientId,
                            },
                            {
                                participant1: recipientId,
                                participant2: senderId,
                            },
                        ],
                    },
                    select: {
                        id: true,
                    },
                });

                let roomId = searchRoom?.length > 0 ? searchRoom.id : null;
                if(searchRoom?.length<1) {
                    const createRoom = await prisma.chatRoom.craete({
                        data: {
                            participant1: senderId,
                            participant2: recipientId,
                        },
                    });
                    roomId = createRoom.id;
                }

                const newChat = await prisma.chat.create({
                    data: {
                        roomId: roomId,
                        content: content,
                        senderId: senderId,
                    },
                });

                return res.status(200).json({ newChat: newChat });
            } catch(err) {
                return res.status(500).json({ message: "Internal Server Error"});
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
}