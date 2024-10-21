/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { availableRoomsWithDetails, Room } from './entities/room.entity';
import { GetAvailableRoomsDto } from './dto/GetAvailableRoomsDto ';
// import { CreateRoomInput } from './dto/create-room.input';
// import { UpdateRoomInput } from './dto/update-room.input';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  // @Mutation(() => Room)
  // createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
  //   return this.roomsService.create(createRoomInput);
  // }

  @Query(() => [availableRoomsWithDetails], { name: 'getAvailablesRooms' })
  getAvablesRooms(
    @Args('input') input: GetAvailableRoomsDto,
  ) {    
    return this.roomsService.getAvablesRooms(input);
  }

  @Query(() => Room, { name: 'room' })
  findOne(
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.roomsService.findOne(id);
  }

  // @Mutation(() => Room)
  // updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
  //   return this.roomsService.update(updateRoomInput.id, updateRoomInput);
  // }

  @Mutation(() => Room)
  removeRoom(@Args('id', { type: () => Int }) id: number) {
    return this.roomsService.remove(id);
  }
}
