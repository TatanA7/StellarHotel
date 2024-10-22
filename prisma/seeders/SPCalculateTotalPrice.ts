/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function SPCalculateTotalPrice() {
    await prisma.$executeRawUnsafe(`
        CREATE OR REPLACE FUNCTION get_available_rooms(
            check_in DATE, 
            check_out DATE, 
            breakfast BOOLEAN, 
            guests INT
        )
        RETURNS TABLE (
            roomId INT, 
            baseRate NUMERIC, 
            breakfastCost NUMERIC, 
            discount NUMERIC, 
            weekendIncrease NUMERIC,
            totalPrice NUMERIC, 
            roomType VARCHAR, 
            maxOccupancy INT
        ) AS $$
        DECLARE
            total_days INT;
            room_weekend_multiplier NUMERIC; -- Incremento para fines de semana
            breakfast_cost_per_person NUMERIC; -- Costo del desayuno por persona
        BEGIN
            -- Calcular la duración de la estancia
            total_days := check_out - check_in;

            -- Obtener los valores de la tabla Parameters
            SELECT 
                (SELECT para."value"::numeric FROM "PricingParameter" para WHERE para."name" = 'WeekendIncrease') AS room_weekend_multiplier,
                (SELECT para."value"::numeric FROM "PricingParameter" para WHERE para."name" = 'BreakfastCost_PerGuest') AS breakfast_cost_per_person
            INTO room_weekend_multiplier, breakfast_cost_per_person;

            RETURN QUERY 
            SELECT 
                r.id AS roomId,
                rt.price::numeric AS baseRate,
                (CASE WHEN breakfast THEN (guests * total_days * breakfast_cost_per_person)::numeric ELSE 0 END) AS breakfastCost,
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
                    (CASE WHEN breakfast THEN (guests * total_days * breakfast_cost_per_person)::numeric ELSE 0 END) + 
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
                rt."maxOccupancy" AS maxOccupancy
            FROM "Room" r
            JOIN "RoomType" rt ON r."roomTypeId" = rt.id
            WHERE rt."maxOccupancy" >= guests  
            AND (
                -- Asegurarse de que no haya reservas activas para las fechas solicitadas
                NOT EXISTS (
                    SELECT 1 
                    FROM "Reservation" r2 
                    WHERE r2."roomId" = r.id 
                    AND r2."isCancelled" = false 
                    AND (
                        (r2."checkIn" < check_out AND r2."checkOut" > check_in) -- Conflicto en las fechas
                    )
                )
            );
        END;
        $$ LANGUAGE plpgsql;
    `);
}

export default SPCalculateTotalPrice;
