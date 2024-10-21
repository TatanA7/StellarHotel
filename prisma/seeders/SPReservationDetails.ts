import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function SPReservationDetail() {
  await prisma.$executeRawUnsafe(`
			CREATE OR REPLACE FUNCTION sp_reservation_details(
					reservationId INT
			)
			RETURNS TABLE (
					id INT,
					roomId INT, 
					baseRate NUMERIC, 
					breakfastCost NUMERIC, 
					discount NUMERIC, 
					weekendIncrease NUMERIC,
					totalPrice NUMERIC, 
					roomType VARCHAR, 
					maxOccupancy INT,
					numberOfGuests INT
			) AS $$
			DECLARE
					total_days INT;
					room_weekend_multiplier NUMERIC; -- Incremento para fines de semana
					breakfast_cost_per_person NUMERIC; -- Costo del desayuno por persona
					breakfast_included BOOLEAN;
					number_of_guests NUMERIC;
					check_out DATE;
					check_in DATE;
			BEGIN
					-- Obtener valores de los parámetros
					SELECT 
							(SELECT para."value"::numeric FROM "PricingParameter" para WHERE para."name" = 'WeekendIncrease') AS room_weekend_multiplier,
							(SELECT para."value"::numeric FROM "PricingParameter" para WHERE para."name" = 'BreakfastCost_PerGuest') AS breakfast_cost_per_person
					INTO room_weekend_multiplier, breakfast_cost_per_person;

					-- Obtener la información de la reserva
					SELECT 
							EXTRACT(DAY FROM (res."checkOut" - res."checkIn")),
							res."breakfastIncluded",
							res."numberOfGuests",
							res."checkOut",
							res."checkIn"
					INTO total_days, breakfast_included, number_of_guests, check_out, check_in
					FROM "Reservation" res WHERE res.id = reservationId;

					-- Devolver la consulta
					RETURN QUERY 
					SELECT 
							res.id AS id,
							r.id AS roomId,
							rt.price::numeric AS baseRate,
							(CASE WHEN breakfast_included THEN (number_of_guests * total_days * breakfast_cost_per_person)::numeric ELSE 0 END) AS breakfastCost,
							(CASE 
									WHEN total_days BETWEEN 4 AND 6 THEN (-4 * total_days)::numeric
									WHEN total_days BETWEEN 7 AND 9 THEN (-8 * total_days)::numeric
									WHEN total_days >= 10 THEN (-12 * total_days)::numeric
									ELSE 0::numeric
							END) AS discount,
							(
									SELECT SUM(
											CASE WHEN EXTRACT(DOW FROM gs_date) IN (0, 6) 
											THEN (rt.price * room_weekend_multiplier - rt.price)::numeric 
											ELSE 0::numeric 
											END
									) 
									FROM generate_series(check_in, check_out - INTERVAL '1 day', '1 day') AS gs(gs_date)
							) AS weekendIncrease,
							(
									-- Calcular el precio total
									(rt.price * total_days)::numeric + 
									(CASE WHEN breakfast_included THEN (number_of_guests * total_days * breakfast_cost_per_person)::numeric ELSE 0 END) + 
									(CASE 
											WHEN total_days BETWEEN 4 AND 6 THEN (-4 * total_days)::numeric
											WHEN total_days BETWEEN 7 AND 9 THEN (-8 * total_days)::numeric
											WHEN total_days >= 10 THEN (-12 * total_days)::numeric
											ELSE 0::numeric
									END) +
									(
											SELECT SUM(
													CASE WHEN EXTRACT(DOW FROM gs_date) IN (0, 6) 
													THEN (rt.price * room_weekend_multiplier - rt.price)::numeric 
													ELSE 0::numeric 
													END
											) 
											FROM generate_series(check_in, check_out - INTERVAL '1 day', '1 day') AS gs(gs_date)
									)
							) AS totalPrice,
							rt.name::VARCHAR AS roomType,  
							rt."maxOccupancy" AS maxOccupancy,
							res."numberOfGuests" AS numberOfGuests
					FROM "Room" r
					JOIN "RoomType" rt ON r."roomTypeId" = rt.id
					LEFT JOIN "Reservation" res ON r.id = res."roomId"
					WHERE res.id = reservationId;

			END;
			$$ LANGUAGE plpgsql;
	`);
}

export default SPReservationDetail;
