/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function parameters() {
  await prisma.pricingParameter.create({
    data: {
      name: "WeekendIncrease",
      value: 1.25
		}
	});

	await prisma.pricingParameter.create({
		data: {
			name: "DaysAdjustment_0_to_3",
			value: 0,
		}
	});
	await prisma.pricingParameter.create({
		data: {
			name: "DaysAdjustment_4_to_6",
			value: -4,
		}
	});
	await prisma.pricingParameter.create({
		data: {
			name: "DaysAdjustment_7_to_9",
			value: -8,
		}
	});
	await prisma.pricingParameter.create({
		data: {
			name: "DaysAdjustment_10_or_more",
			value: -12,
		}
	});

	await prisma.pricingParameter.create({
		data: {
			name: "BreakfastCost_PerGuest",
			value: 5,
		}
	});
}

export default parameters;