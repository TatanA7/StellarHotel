/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { availableRoomsWithDetails, Room } from './entities/room.entity';
import { GetAvailableRoomsDto } from './dto/getAvailableRoomsDto ';
// import { CreateRoomInput } from './dto/create-room.input';
// import { UpdateRoomInput } from './dto/update-room.input';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}


  @Query(() => [availableRoomsWithDetails], { name: 'getAvailablesRooms' })
  getAvablesRooms(
    @Args('input') input: GetAvailableRoomsDto,
  ) {    
    return this.roomsService.getAvablesRooms(input);
  }
}
