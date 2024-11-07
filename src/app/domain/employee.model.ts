export interface Employee {
  id?: number | string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date | string;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}
