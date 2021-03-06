import prisma from "lib/PrismaClient";
import { authenticate } from "middlewares/authenticate";

const handler = authenticate(async (req, res) => {
    switch (req.method) {
        case "POST":
            const { chatRoomId, content } = req.body;
            try {
                const newChat = await prisma.chat.create({
                    data: {
                        roomId: chatRoomId,
                        senderId: req.cookieUserId,
                        content: content,
                    },
                });

                return res.status(200).json({ newChat: newChat });
            } catch(err) {
                console.log(err.message)
                return res.status(500).json({ message: "Internal Server Error"});
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
});

export default handler;