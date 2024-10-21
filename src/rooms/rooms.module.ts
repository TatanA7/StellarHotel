/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [RoomsResolver, RoomsService, PrismaService],
  exports: [RoomsService]
})
export class RoomsModule {}
