import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { CreateAppoitment } from "./create-appoitiment";

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const createAppointment = new CreateAppoitment()

    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 1)
    endsAt.setDate(startsAt.getDate() + 2);

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  });
})