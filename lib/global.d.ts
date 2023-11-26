export {};

declare global {
  interface User {
    status: string;
    code: number;
    data: {
      id: number;
      user_type: string;
      phone_number: string;
      email: string;
      username: string;
      first_name: string;
      last_name: string;
      profile: {
        id: number;
        address: string | null;
        district: number;
        province: number;
        qrcode: unknown | null;
        date_of_birth: string | null;
      };
    };
  }
}
