/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
// import { CreateRoomInput } from './dto/create-room.input';
// import { UpdateRoomInput } from './dto/update-room.input';
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
      
    const mapping:availableRoomsWithDetails[] =  availableRooms.map((ar)=>({
      totalprice:ar.totalprice,
      baserate:ar.baserate,
      maxoccupancy:ar.maxoccupancy,
      roomid:ar.roomid,
      roomtype:ar.roomtype,
      breakDown:{
        discount:ar.discount,
        additionalChange:{
          breakfastcost:ar.breakfastcost,
          weekendincrease:ar.weekendincrease
        }
      }
    }))
    return mapping;
  }

  async validateAvailableRoom(input:validateReservation){
    const {checkinDate,checkoutDate, roomId} = input
    const availableRooms = await this.prisma.room.findMany({
      where: {
        id: roomId,
        AND: [
          { 
            reservations: {
              none: {
                OR: [
                  {
                    isCancelled:false,
                    checkIn: {
                      lt: checkoutDate,
                    },
                    checkOut: {
                      gt: checkinDate,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      include: {
        reservations: true,
        roomType:true
      },
    });    
    return availableRooms
  }
}
