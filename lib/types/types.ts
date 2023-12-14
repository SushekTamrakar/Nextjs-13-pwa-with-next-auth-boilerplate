export interface GenericResponse {
  status: string;
  code: number;
  message: string;
}

export interface IEventRegistrationResponse extends GenericResponse {
  data: {
    event: number;
    user: number;
    district: number;
    localAddress: string;
    email: string;
    phoneNumber: string;
  };
}

export interface IEventRegistration {
  id: number;
  event: number;
  user: number;
  district: number;
  localAddress: string;
  email: string;
  phoneNumber: string;
}
