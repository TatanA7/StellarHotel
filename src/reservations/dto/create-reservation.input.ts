/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsDateString } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @IsInt()
  @Field()
  roomId: number;

  @IsDateString()
  @Field()
  checkinDate: Date;

  @IsDateString()
  @Field()
  checkoutDate: Date;

  @IsInt()
  @Field()
  numberOfGuests: number;

  @IsBoolean()
  @Field()
  breakfastIncluded: boolean;
}
