import { Router } from 'express';
import { executeStatement } from '../services';

const userRouter = Router();

userRouter.get('/', (req, res, next) => {
  executeStatement('EXECUTE usersSelect').then(({ data }) => {
    res.send(data);
  });
});

userRouter.get('/byCode/:id', (req, res, next) => {
  const { id } = req.params;

  executeStatement(`EXECUTE usersSelectByUserCode ${id}`).then(({ data }) => {
    res.send(data);
  });
});

userRouter.post('/insert', (req, res, next) => {
  const { userName } = req.body;
  const { userPassword } = req.body;
  const { userTypeCode } = req.body;
  const { userFirstName } = req.body;
  const { userLastName } = req.body;
  const { userEmail } = req.body;
  const { userPhoneNumber } = req.body;
  const { userStatusCode } = req.body;

  const query =
    'EXECUTE userInsert ' +
    `N'${userName}', ` +
    `N'${userPassword}', ` +
    `N'${userTypeCode}', ` +
    `N'${userFirstName}', ` +
    `N'${userLastName}', ` +
    `N'${userEmail}', ` +
    `N'${userPhoneNumber}', ` +
    `N'${userStatusCode}'`;

  executeStatement(query).then(({ data }) => {
    res.send(data);
  });
});

userRouter.put('/update', (req, res, next) => {
  const { userCode } = req.body;
  const { userName } = req.body;
  const { userPassword } = req.body;
  const { userTypeCode } = req.body;
  const { userFirstName } = req.body;
  const { userLastName } = req.body;
  const { userEmail } = req.body;
  const { userPhoneNumber } = req.body;
  const { userStatusCode } = req.body;

  const query =
    'EXECUTE userUpdate ' +
    `N'${userCode}', ` +
    `N'${userName}', ` +
    `N'${userPassword}', ` +
    `N'${userTypeCode}', ` +
    `N'${userFirstName}', ` +
    `N'${userLastName}', ` +
    `N'${userEmail}', ` +
    `N'${userPhoneNumber}', ` +
    `N'${userStatusCode}'`;

  executeStatement(query).then(({ data }) => {
    res.send(data);
  });
});

userRouter.get('/employee', (req, res, next) => {
  executeStatement('EXECUTE employeeViewSelectAll').then(({ data }) => {
    res.send(data);
  });
});

userRouter.post('/login', (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const query = 'EXECUTE userLogIn ' + `N'${userEmail}', ` + `N'${userPassword}'`;

  executeStatement(query).then(({ data }) => {
    res.send(data);
  });
});

export default userRouter;
