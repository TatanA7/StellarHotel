/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@ObjectType()
export class RoomType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  maxOccupancy: number;

  @Field(() => Int)
  numberOfBeds: number;

  @Field(() => [Room])
  rooms?: Room[];
}

@ObjectType()
export class Room {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  roomTypeId: number;

  @Field()
  hasOceanView: boolean;

  @Field(() => [Reservation])
  reservations: Reservation[];

  @Field(() => RoomType)
  roomType: RoomType;
}

@ObjectType()
export class AdditionalChange {
  @Field(() => Float)
  breakfastcost: number;
  
  @Field(() => Float)
  weekendincrease: number;
}

@ObjectType()
export class Breakdown {
  @Field(() => Float)
  discount: number;

  @Field()
  additionalChange: AdditionalChange;
}

@ObjectType()
export class availableRoomsWithDetails {
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
  breakDown: Breakdown;
}

export interface IresultaDataBase {
  breakfastcost: number;
  weekendincrease: number;
  discount: number;
  roomid: number;
  baserate: number;
  totalprice: number;
  roomtype: string;
  maxoccupancy: number;
  breakDown: Breakdown;
}