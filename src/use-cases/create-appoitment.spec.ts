import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppoitment } from "./create-appoitiment";

describe("Create Appointment", () => {
  it("should be able to create an appointment", () => {
    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-11");

    const appointmentRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppoitment(appointmentRepository);

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(startsAt.getDate() + 2);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
  it("should not be able to create an appointment with overllping dates", async () => {
    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-15");

    const appointmentRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppoitment(appointmentRepository);

    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    });
    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-14"),
        endsAt: getFutureDate("2022-08-18"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
