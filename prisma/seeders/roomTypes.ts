/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function roomType() {
  const roomType1 = await prisma.roomType.create({
    data: {
      id:1,
      name: "Junior Suite",
      price: 60,
      maxOccupancy: 2,
      numberOfBeds:1
    },
  });

  const roomType2 = await prisma.roomType.create({
    data: {
      id:2,
      name: "King Suite",
      price: 90,
      maxOccupancy: 4,
      numberOfBeds:2
    },
  });

  const roomType3 = await prisma.roomType.create({
    data: {
      id:3,
      name: "Presidential Suite",
      price: 150,
      maxOccupancy: 8,
      numberOfBeds:4
    },
  });
  console.log({ roomType1, roomType2, roomType3 });
}

export default roomType