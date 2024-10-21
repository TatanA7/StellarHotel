/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('RoomsService', () => {
  let service: RoomsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: PrismaService,
          useValue: {
            room: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('validateAvailableRoom', () => {
    it('should return available rooms based on the provided dates and roomId', async () => {
      const mockRoomInput = {
        checkinDate: new Date(),
        checkoutDate: new Date(),
        roomId: 1,
      };

      const mockAvailableRooms = [{ id: 1, roomTypeId: 1 }];

      prismaService.room.findMany = jest.fn().mockResolvedValue(mockAvailableRooms);

      const result = await service.validateAvailableRoom(mockRoomInput);
      expect(result).toEqual(mockAvailableRooms);
    });
  });
});
