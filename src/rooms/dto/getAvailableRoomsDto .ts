/* eslint-disable prettier/prettier */
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNumber } from 'class-validator';

@InputType()
export class validateReservation {

	@Field(() => Int, { nullable: true })
  @IsNumber()
  roomId?: number;

	@Field()
  @IsDate()
  checkinDate: Date;

	@Field()
  @IsDate()
  checkoutDate: Date;
}

@InputType()
export class GetAvailableRoomsDto extends validateReservation {
	@Field()
  @IsNumber()
  Amountguests: number;

	@Field()
  @IsBoolean()
  breakfast: boolean;
}
