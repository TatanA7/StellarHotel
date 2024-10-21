/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function room() {
	const roomTypes = await prisma.roomType.findMany({
		select: { id: true },
	});
	const roomTypeIds = roomTypes.map(rt => rt.id);
	const totalRecords = roomTypeIds.length;

  for (let index = 0; index < 20; index++) {
		const randomRoomTypeId = roomTypeIds[Math.floor(Math.random() * totalRecords)];	
		await prisma.room.create({
			data: {
				hasOceanView:  Math.random() >= 0.5,
				roomTypeId:  randomRoomTypeId
			},
		}); 
  }
}

export default room