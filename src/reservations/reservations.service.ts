/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateReservationInput } from './dto/create-reservation.input';
// import { UpdateReservationInput } from './dto/update-reservation.input';
import { RoomsService } from 'src/rooms/rooms.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Reservation } from '@prisma/client';

@Injectable()
export class ReservationsService {
  private readonly currentDate: Date;
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

  // async reservationDetails (id:number){
  //   return "Hoola"
  // }
  async update(reservationId: number) {
    return await this.prisma.reservation.update({
      where:{id:reservationId},
      data:{isCancelled:true},
      include:{room:{include:{roomType:true}}}
    })
  }
}
