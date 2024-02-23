import { Request, Response } from 'express';
import loginServices from '../service/login.services';
import mapStatusHTTP from '../utils/codeMapper';

const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;
  const response = await loginServices.getLogin({ username, password });
  if (response.status !== 'SUCCEFULL') {
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }
  return res.status(mapStatusHTTP(response.status)).json(response.data);
};
export default {
  login,
};