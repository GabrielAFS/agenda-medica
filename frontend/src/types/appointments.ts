import { IDoctor, IPacient } from "./users";

export interface IAppointment {
  id: number;
  pacient: IPacient;
  doctor: IDoctor;
  startTime: string;
}
