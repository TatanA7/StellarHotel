/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAvailableRoomsDto, validateReservation } from './dto/getAvailableRoomsDto ';
import { availableRoomsWithDetails, IresultaDataBase } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService){  }

  findAll() {
    return this.prisma.room.findMany();
  }

  async getAvablesRooms(input:GetAvailableRoomsDto) {
    const {checkinDate,checkoutDate, Amountguests, breakfast} = input
    const availableRooms:[IresultaDataBase] = await this.prisma.$queryRaw` 
      SELECT * 
      FROM get_available_rooms(
      ${checkinDate}::DATE,
      ${checkoutDate}::DATE,
      ${breakfast},
      ${Amountguests}::INTEGER);`;
      
    return this.mapAvailableRooms(availableRooms);;
  }

  private mapAvailableRooms(availableRooms: IresultaDataBase[]): availableRoomsWithDetails[] {
    return availableRooms.map(room => ({
      totalprice: room.totalprice,
      baserate: room.baserate,
      maxoccupancy: room.maxoccupancy,
      roomid: room.roomid,
      roomtype: room.roomtype,
      breakDown: {
        discount: room.discount,
        additionalChange: {
          breakfastcost: room.breakfastcost,
          weekendincrease: room.weekendincrease,
        },
      },
    }));
  }

  async validateAvailableRoom(input:validateReservation){
    const {checkinDate,checkoutDate, roomId} = input
    const availableRooms = await this.prisma.room.findMany({
      where: {
        id: roomId,
        reservations: {
          none: {
            isCancelled: false,
            checkIn: { lt: checkoutDate },
            checkOut: { gt: checkinDate },
          },
        },
      },
      include: {
        reservations: true,
        roomType: true,
      },
    });
    
    return availableRooms
  }
}
