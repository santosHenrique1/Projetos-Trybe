import bcrypt from 'bcryptjs';
import Jwt from '../utils/Jwt';
import { ServiceResponse } from '../types/ServiceResponse';
import UserModel from '../database/models/user.model';
import LoginPayload from '../types/LoginPayload';
import Token from '../types/Token';

const getLogin = async (login : LoginPayload) : Promise<ServiceResponse<Token>> => {
  const user = await UserModel.findOne({ where: { username: login.username } });
  if (!user) {
    return {
      status: 'UNAUTHORIZED',
      data: { message: 'Username or password invalid' },
    };
  }
  const validatePassword = bcrypt.compareSync(login.password, user.dataValues.password);
  if (!validatePassword) {
    return {
      status: 'UNAUTHORIZED',
      data: { message: 'Username or password invalid' },
    };
  }
  const token = Jwt.sign({ id: user.dataValues.id });
  return { status: 'SUCCEFULL', data: { token } };
};
export default {
  getLogin,
};