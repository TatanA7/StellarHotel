/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateReservationInput } from './dto/create-reservation.input';
import { RoomsService } from 'src/rooms/rooms.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Reservation } from '@prisma/client';
import { IresultaSPReservationDetails, reservationsWithDetails } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  private readonly currentDate: Date= new Date();
  constructor(
    private readonly roomsService: RoomsService,
    private readonly prisma: PrismaService) {}

  async create(createReservationInput: CreateReservationInput) {
    const {breakfastIncluded, 
           checkinDate, 
           checkoutDate, 
           numberOfGuests, 
           roomId} 
          = createReservationInput;

    const isAvailableRoom = await this.roomsService.validateAvailableRoom({checkinDate, checkoutDate, roomId})
    let newReservation: Reservation;
    if(isAvailableRoom.length > 0) {
       newReservation = await this.prisma.reservation.create({
        data:{
          breakfastIncluded,
          checkIn:checkinDate,
          checkOut:checkoutDate,
          isCancelled:false,
          numberOfGuests,
          roomId
        }
      })
      return newReservation;
    }else{
      throw new Error("This room can't be reserved ");
    }
    
  }

  async pastReservations() {
    console.log(this.currentDate);
    
    return await this.prisma.reservation.findMany({
      where: {
        checkOut: { lt: this.currentDate }
      },
      include: {
        room: {include:{roomType:true}}
      },
    })
  } 

  async onGoingReservations () {
    return await this.prisma.reservation.findMany({
      where: {
        // ongoing reservation
        checkIn: { lte: this.currentDate },
        checkOut: { gte: this.currentDate },
      },
      include: {
        room: {include:{roomType:true}}
      },
    })
  }

  async futureReservations(){
    return await this.prisma.reservation.findMany({
      where: {
        // future reservations
        checkIn: { gt: this.currentDate },
      },
      include: {
        room: {include:{roomType:true}}
      },
    })
  } 
  async findAll() {      
    return {
      past:this.pastReservations(), 
      onGoing:this.onGoingReservations(), 
      future: this.futureReservations()
    };  
  }

  async reservationDetails (reservationId:number){
    const availableRooms:IresultaSPReservationDetails[] = await this.prisma.$queryRaw` 
      SELECT * 
      FROM sp_reservation_details(
      ${reservationId}::INTEGER);`;

    return this.mapReservationDetails(availableRooms)
  }
  async update(reservationId: number) {
    return await this.prisma.reservation.update({
      where:{id:reservationId},
      data:{isCancelled:true},
      include:{room:{include:{roomType:true}}}
    })
  }

  private mapReservationDetails(availableRooms: IresultaSPReservationDetails[]): reservationsWithDetails[] {
    return availableRooms.map(ar => ({
      id: ar.id,
      totalprice: ar.totalprice,
      baserate: ar.baserate,
      maxoccupancy: ar.maxoccupancy,
      roomid: ar.roomid,
      roomtype: ar.roomtype,
      numberOfGuests: ar.numberofguests,
      breakDown: {
        discount: ar.discount,
        additionalChange: {
          breakfastcost: ar.breakfastcost,
          weekendincrease: ar.weekendincrease,
        },
      },
    }));
  }
}
