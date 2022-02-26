import prisma from "lib/PrismaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            try {
                const toggleLike = await prisma.chat.update({
                    where: {
                        id: req.body.chatId,
                    },
                    data: {
                        liked: req.body.liked,
                    },
                });

                return res.status(200).json({ message: "Success" });
            } catch(err) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
}