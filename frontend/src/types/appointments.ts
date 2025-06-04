import { IDoctor, IPacient } from "./users";

export interface IAppointment {
  id: number;
  pacient: IPacient;
  doctor: IDoctor;
  startTime: string;
}

export interface IAppointmentTime {
  id: number;
  startTime: string;
}
