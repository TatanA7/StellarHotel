/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsResolver } from './reservations.resolver';
import { RoomsService } from 'src/rooms/rooms.service';
import { RoomsModule } from 'src/rooms/rooms.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[RoomsModule],
  providers: [ReservationsResolver, ReservationsService, RoomsService, PrismaService],
  exports: [ReservationsService]
})
export class ReservationsModule {}
