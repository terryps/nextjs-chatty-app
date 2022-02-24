import prisma from "lib/PrismaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
          try {
            let config = {};
            if(req.body.userId) {
              config.id = req.body.userId;
            } else if(req.body.username) {
              config.username = req.body.username;
            } else {
              return res.status(500).json({ message: "Internal Server Error" });
            }
            
            const user = await prisma.user.findUnique({
              where: config,
              select: {
                username: true,
                fullname: true,
                avatarUrl: true,
                about: true,
              }
            });
    
            if(!!user) {
              return res.status(200).json({ userData: user, message: "Success" });
            } else {
              // user not found
              return res.status(404).json({ message: "No Account Found." });
            }
          } catch(err) {
            return res.status(500).json({ message: err.message });
          }
    
        default:
            return res.status(405).end(`Method ${req.method} is not allowed.`)
    }
}