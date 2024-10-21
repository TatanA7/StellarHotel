/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import roomTypes from './roomTypes';
import room from './rooms';
import SPCalculateTotalPrice from './SPCalculateTotalPrice';
import parameters from './parameters';
import SPReservationDetail from './SPReservationDetails';

const prisma = new PrismaClient();

async function main() {
  // roomTypes().then( ()=>
  //   room()
  // )
  // parameters()
  SPReservationDetail();
  // SPCalculateTotalPrice();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });