/*
  Warnings:

  - You are about to drop the `chat_likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat_likes" DROP CONSTRAINT "chat_likes_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "chat_likes" DROP CONSTRAINT "chat_likes_user_id_fkey";

-- DropTable
DROP TABLE "chat_likes";
