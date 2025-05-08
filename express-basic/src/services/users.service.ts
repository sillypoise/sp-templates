import { createUser as createUserInDb, getAllUsers } from '@models/users.model';

export const getUsers = () => {
  return getAllUsers();
};

export const createUser = (data: { name: string; email: string }) => {
  // You could add more logic here before calling the DB
  return createUserInDb(data);
};
