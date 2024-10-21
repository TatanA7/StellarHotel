/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Breakdown, Room } from 'src/rooms/entities/room.entity';

@ObjectType()
export class Reservation {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  roomId: number;

  @Field(() => Date)
  checkIn: Date;

  @Field(() => Date)
  checkOut: Date;

  @Field(() => Int)
  numberOfGuests: number;

  @Field()
  breakfastIncluded: boolean;

  @Field(() => Boolean)
  isCancelled: boolean;;

  @Field(() => Room)
  room: Room;
}

@ObjectType()
export class CategorizationReservation {
  @Field(() => [Reservation])
  past:Reservation[]

  @Field(() => [Reservation])
  onGoing:Reservation[]

  @Field(() => [Reservation])
  futures:Reservation[]
}

@ObjectType()
export class reservationsWithDetails {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  roomid: number;

  @Field(() => Float)
  baserate: number;

  @Field(() => Float)
  totalprice: number;

  @Field(() => String)
  roomtype: string;

  @Field(() => Int)
  maxoccupancy: number;

  @Field()
  numberOfGuests: number;

  @Field()
  breakDown: Breakdown;
}

export interface IresultaSPReservationDetails {
  id: number;
  breakfastcost: number;
  weekendincrease: number;
  discount: number;
  roomid: number;
  baserate: number;
  totalprice: number;
  roomtype: string;
  maxoccupancy: number;
  numberofguests:number;
  breakDown: Breakdown;
}