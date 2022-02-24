import prisma from "lib/PrismaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            try {
                const {userId, config} = req.body;

                // find user id to add
                const { id: userIdToAdd, username: usernameToAdd } = await prisma.user.findUnique({
                    where: config,
                    select: { id: true, username: true },
                });
                
                if(!userIdToAdd) {
                    return res.status(500).json({ message: "User Not Found."});
                }

                const checkFriendship = await prisma.friendship.findMany({
                    where: { userId: userId, friendId: userIdToAdd, },
                });
                if(checkFriendship?.length > 0) {
                    return res.status(200).json({ id: userIdToAdd, message: "Success" });
                }

                // check friendship already exists
                const check = await prisma.friendRequest.findMany({
                    where: { requesterId: userId, addresseeId: userIdToAdd, },
                });
                if(check.length > 0) {
                    return res.status(200).json({ id: userIdToAdd, message: "Success" });
                }
                
                const checkRequest = await prisma.friendRequest.findMany({
                    where: {
                        requesterId: userIdToAdd,
                        addresseeId: userId,
                    },
                });
                // console.log("find request : ", checkRequest);

                if(checkRequest.length > 0) {
                    const createFriendShip = await prisma.friendship.create({
                        data: {
                            userId: userId,
                            friendId: userIdToAdd,
                        },
                    });
                    // console.log("create friendship : ", createFriendShip);
                    const oppositeFriendShip = await prisma.friendship.create({
                        data:  {
                            userId: userIdToAdd,
                            friendId: userId,
                        },
                    });
                    // console.log("create opposite friendship : ", oppositeFriendShip);
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
                    // console.log("delete accepted requests : ", deleteRequests);

                    return res.status(200).json({ id: userIdToAdd, message: `Added ${usernameToAdd} as friend.` });
                } else {
                    const createRequest = await prisma.friendRequest.create({
                        data: {
                            requesterId: userId,
                            addresseeId: userIdToAdd,
                        },
                    });
                    // console.log("create request : ", createRequest);

                    return res.status(200).json({ id: userIdToAdd, message: `Sent friend request to ${usernameToAdd}.`});
                }
                
            } catch(err) {
                return res.status(500).json({ message: "Internal Server Error"});
            }
        default:
            res.status(405).end(`Method ${req.method} is not allowed.`);
    }
}