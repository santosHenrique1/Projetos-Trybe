const validPassword = 'terrivel';
const nousernameLoginBody = { username: '', password: validPassword };

const validusername = 'Hagar';
const noPasswordLoginBody = { username: validusername, password: '' };

const invalidUsername = {
    username: 'poggers',
    password: validPassword,
}

const loginSucces = { username: validusername, password: validPassword };
export default {
  nousernameLoginBody,
  noPasswordLoginBody,
  loginSucces,
  invalidUsername,
};