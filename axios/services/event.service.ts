import http from "../http-common";

interface EventCreateType {
  status: string;
  start_date: string;
  end_date: string;
  unlimited_seats: boolean;
  total_seats: number;
  name: string;
}

class EventDataService {
  getAll() {
    return http.get<Event[]>("/events");
  }
  getOne(id: number) {
    return http.get(`/events/${id}`);
  }
  create(data: EventCreateType) {
    return http.post("/events/");
  }
  update(id: number, data: Partial<EventCreateType>) {
    return http.put(`/events/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/events/${id}`);
  }
}

const eventService = new EventDataService();
export default eventService;
