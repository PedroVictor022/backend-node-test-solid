import { expect, test } from "vitest";
import { Appointment } from "./appointment";

test("create an appointment", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() + 1)
  endsAt.setDate(endsAt.getDate() + 2);

  const appointment = new Appointment({
    customer: "John Doe",
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("John Doe");
});

test("Cannot create an appointment with end date before start data", () => {
  const startsAt = new Date(); // Creating a init date
  const endsAt = new Date(); // Creating a ends date

  // Getting the end date as a start date earlier than the start date
  endsAt.setDate(endsAt.getDate() +   1);
  startsAt.setDate(startsAt.getDate() + 2);

  expect(() => {
    new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    });
  }).toThrow()
});
