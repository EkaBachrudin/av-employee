import { Employee } from "../domain/employee.model";

export const allGroup = ['Frontend', 'Backend', 'SRE',  'Marketing', 'Sales', 'HR', 'Finance', 'Content', 'Legal', 'GA'];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomEmployee(id: number): Employee {
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Williams'];
  const groups = allGroup;
  const statuses = ['Active', 'Inactive', 'Probation'];

  const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
  const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
  const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${getRandomInt(1, 100)}`;
  const email = `${username}@example.com`;
  const birthDate = new Date(getRandomInt(1970, 2000), getRandomInt(0, 11), getRandomInt(1, 28));
  const basicSalary = parseFloat((getRandomInt(30000, 120000) + Math.random()).toFixed(2));
  const status = statuses[getRandomInt(0, statuses.length - 1)];
  const group = groups[getRandomInt(0, groups.length - 1)];
  const description = `Employee in ${group} department`;

  return {
    id,
    username,
    firstName,
    lastName,
    email,
    birthDate,
    basicSalary,
    status,
    group,
    description,
  };
}

export function generateMockEmployees(count: number): Employee[] {
  const employees: Employee[] = [];
  for (let i = 0; i < count; i++) {
    employees.push(generateRandomEmployee(i+1));
  }
  return employees;
}
