import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";

// Caso de uso tem uma unica responsabilidade
interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppoitment {

  constructor(
    private appointmentsRepository: AppointmentsRepository
  ) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(startsAt, endsAt)

    if(overlappingAppointment) {
      throw new Error('Another appointment overlaps this appointment dates')
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    }); 

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
