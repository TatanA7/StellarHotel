/* eslint-disable prettier/prettier */
import { IsNumber } from 'class-validator';
import { InputType, Field} from '@nestjs/graphql';

@InputType()
export class CancelReservationInput {
  @IsNumber()
  @Field()
  reservationId: number;
}
