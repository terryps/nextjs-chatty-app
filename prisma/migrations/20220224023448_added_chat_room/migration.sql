/*
  Warnings:

  - You are about to drop the column `published` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the `chat_recipients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `room_id` to the `chats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chat_recipients" DROP CONSTRAINT "chat_recipients_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "chat_recipients" DROP CONSTRAINT "chat_recipients_recipient_id_fkey";

-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_sender_id_fkey";

-- AlterTable
ALTER TABLE "chats" DROP COLUMN "published",
ADD COLUMN     "room_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "chat_recipients";

-- CreateTable
CREATE TABLE "chat_room" (
    "id" SERIAL NOT NULL,
    "participant_1" INTEGER NOT NULL,
    "participant_2" INTEGER NOT NULL,

    CONSTRAINT "chat_room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "chat_room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_room" ADD CONSTRAINT "chat_room_participant_1_fkey" FOREIGN KEY ("participant_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_room" ADD CONSTRAINT "chat_room_participant_2_fkey" FOREIGN KEY ("participant_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
