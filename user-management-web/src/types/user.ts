export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  team: string;
}

export interface UsersResponse {
  _embedded: {
    users: User[];
  };
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
