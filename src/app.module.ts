/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ReservationsModule } from './reservations/reservations.module';
import { RoomsModule } from './rooms/rooms.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CsrfController } from './csrf/csrf.controller';
import { VoyagerController } from './voyager/voyager.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      csrfPrevention:false,
      playground:true
    }),
    RoomsModule, ReservationsModule
  ],
  controllers: [AppController, CsrfController, VoyagerController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
