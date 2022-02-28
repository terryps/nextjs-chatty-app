import prisma from "lib/PrismaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            try {
                const {userId, userIdToAdd} = req.body;
                
                if(!userIdToAdd) {
                    return res.status(500).json({ message: "User Not Found."});
                }

                const checkFriendship = await prisma.friendship.findMany({
                    where: { userId: userId, friendId: userIdToAdd, },
                });
                if(checkFriendship?.length > 0) {
                    return res.status(200).json({ message: "Success" });
                }

                // check friendship request already exists
                const check = await prisma.friendRequest.findMany({
                    where: { requesterId: userId, addresseeId: userIdToAdd, },
                });
                if(check.length > 0) {
                    return res.status(200).json({ message: "Success" });
                }
                
                const checkRequest = await prisma.friendRequest.findMany({
                    where: {
                        requesterId: userIdToAdd,
                        addresseeId: userId,
                    },
                });

                if(checkRequest.length > 0) {
                    const createFriendShip = await prisma.friendship.create({
                        data: {
                            userId: userId,
                            friendId: userIdToAdd,
                        },
                    });
                    const oppositeFriendShip = await prisma.friendship.create({
                        data:  {
                            userId: userIdToAdd,
                            friendId: userId,
                        },
                    });
                    const deleteRequests = await prisma.friendRequest.deleteMany({
                        where: {
                            OR: [
                                {
                                    requesterId: userIdToAdd,
                                    addresseeId: userId,
                                },
                                {
                                    requesterId: userId,
                                    addresseeId: userIdToAdd,
                                },
                            ],
                        },
                    });

                    return res.status(200).json({ message: "Success" });
                } else {
                    const createRequest = await prisma.friendRequest.create({
                        data: {
                            requesterId: userId,
                            addresseeId: userIdToAdd,
                        },
                    });
                    return res.status(200).json({ message: "Success" });
                }
                
            } catch(err) {
                return res.status(500).json({ message: "Internal Server Error"});
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
}