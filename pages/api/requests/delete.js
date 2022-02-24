import prisma from "lib/PrismaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            try {
                const deleteRequest = await prisma.friendRequest.deleteMany({
                    where: req.body,
                });

                return res.status(200).json({ message: "Success" })
            } catch(err) {
                return res.status(500).json({ message: err.message });
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
}