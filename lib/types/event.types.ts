export type EventType = {
  id: number;
  name: string;
};

export interface IEventResponse extends GenericResponse {
  data: EventType[];
}

export interface IEventState {
  loading: boolean;
  events: IEventResponse | undefined;
  error: string | undefined;
}
