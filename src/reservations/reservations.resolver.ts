/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { CategorizationReservation, Reservation, reservationsWithDetails } from './entities/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { CancelReservationInput } from './dto/cancel-reservation.input';
// import { UpdateReservationInput } from './dto/update-reservation.input';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => Reservation)
  createReservation(
    @Args('input') input: CreateReservationInput,
  ) {
    return this.reservationsService.create(input);
  }

  @Query(() => CategorizationReservation, { name: 'getAllReservation' })
  getAllReservartion() {
    return this.reservationsService.findAll();
  }

  @Query(() => [reservationsWithDetails], { name: 'getReservationDetail' })
  getReservationDetail(
    @Args('reservationId') reservationId: number
  ) {
    return this.reservationsService.reservationDetails(reservationId);
  }

  @Mutation(() => Reservation)
  cancelReservation(
    @Args('cancelReservationInput') cancelReservationInput: CancelReservationInput
  ) {
    return this.reservationsService.update(cancelReservationInput.reservationId);
  }
}
