export interface IDoctor {
  id: number;
  userId: number;
  specialty: string;
  crm: string;
  name: string;
  email: string;
  photo?: string;
  birthDate: string;
}

export interface IPacient {
  id: number;
  userId: number;
  name: string;
  email: string;
  photo?: string;
  birthDate: string;
}
