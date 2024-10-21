/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Room } from 'src/rooms/entities/room.entity';

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