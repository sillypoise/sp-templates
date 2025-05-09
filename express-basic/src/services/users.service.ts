import {
  createUser as createUserInDb,
  getAllUsers,
  type User,
} from "@models/users.model";

export const getUsers = (): User[] => {
  return getAllUsers();
};

export const createUser = (data: { name: string; email: string }): User => {
  // You could add more logic here before calling the DB
  return createUserInDb(data);
};
