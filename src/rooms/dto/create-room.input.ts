/* eslint-disable prettier/prettier */
import { Field, InputType} from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateRoomInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  type: string;

  @IsInt()
  @Field()
  maxOccupancy: number;

  @IsInt()
  @Field()
  numberOfBeds: number;

  @IsBoolean()
  @Field()
  hasOceanView: boolean;

  @IsNumber()
  @Field()
  pricePerNight: number;
}
