/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';

import { RoomsService } from 'src/rooms/rooms.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let prismaService: PrismaService;
  let roomsService: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: PrismaService,
          useValue: {
            reservation: {
              create: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
            },
            $queryRaw: jest.fn(),
          },
        },
        {
          provide: RoomsService,
          useValue: {
            validateAvailableRoom: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    prismaService = module.get<PrismaService>(PrismaService);
    roomsService = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a reservation if the room is available', async () => {
      // Mock data
      const mockReservationInput = {
        breakfastIncluded: true,
        checkinDate: new Date(),
        checkoutDate: new Date(),
        numberOfGuests: 2,
        roomId: 1,
      };
      const mockReservation = { id: 1, ...mockReservationInput };

      roomsService.validateAvailableRoom = jest.fn().mockResolvedValue([mockReservationInput]);

      prismaService.reservation.create = jest.fn().mockResolvedValue(mockReservation);

      const result = await service.create(mockReservationInput);

      expect(roomsService.validateAvailableRoom).toHaveBeenCalledWith({
        checkinDate: mockReservationInput.checkinDate,
        checkoutDate: mockReservationInput.checkoutDate,
        roomId: mockReservationInput.roomId,
      });
      expect(prismaService.reservation.create).toHaveBeenCalledWith({
        data: {
          breakfastIncluded: true,
          checkIn: mockReservationInput.checkinDate,
          checkOut: mockReservationInput.checkoutDate,
          isCancelled: false,
          numberOfGuests: mockReservationInput.numberOfGuests,
          roomId: mockReservationInput.roomId,
        },
      });
      expect(result).toEqual(mockReservation);
    });

    it('should throw an error if the room is not available', async () => {
      const mockReservationInput = {
        breakfastIncluded: true,
        checkinDate: new Date(),
        checkoutDate: new Date(),
        numberOfGuests: 2,
        roomId: 1,
      };

      roomsService.validateAvailableRoom = jest.fn().mockResolvedValue([]);

      await expect(service.create(mockReservationInput)).rejects.toThrow("This room can't be reserved");
    });
  });

  describe('reservationDetails', () => {
    it('should return reservation details', async () => {
      const mockReservationId = 1; // Ajusta este ID según tu prueba
      const mockrecivedData = [{
        id: 1,
        breakfastcost: 20,
        weekendincrease: 5,
        discount: 10,
        roomid: 1,
        baserate: 60,
        totalprice: 100,
        roomtype: 'Junior Suite',
        maxoccupancy: 2,
        numberofguests:2
      }]
      const mockReservationDetails = [
        {
          id: 1,
          totalprice: 100,
          baserate: 60,
          maxoccupancy: 2,
          roomid: 1,
          roomtype: 'Junior Suite',
          numberOfGuests: 2,
          breakDown: {
            discount: 10,
            additionalChange: {
              breakfastcost: 20,
              weekendincrease: 5,
            },
          },
        },
      ];
    
      (prismaService.$queryRaw as jest.Mock).mockResolvedValue(mockrecivedData);
      const result = await service.reservationDetails(mockReservationId);
      expect(result).toEqual(mockReservationDetails);
    });
    
    
  });

  describe('update', () => {
    it('should update a reservation to cancel it', async () => {
      const mockReservationId = 1;
      const mockUpdatedReservation = {
        id: mockReservationId,
        isCancelled: true,
        room: { roomType: { name: 'Deluxe' } },
      };

      prismaService.reservation.update = jest.fn().mockResolvedValue(mockUpdatedReservation);

      const result = await service.update(mockReservationId);

      expect(prismaService.reservation.update).toHaveBeenCalledWith({
        where: { id: mockReservationId },
        data: { isCancelled: true },
        include: { room: { include: { roomType: true } } },
      });
      expect(result).toEqual(mockUpdatedReservation);
    });
  });
});
