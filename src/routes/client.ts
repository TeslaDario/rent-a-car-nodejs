import { Router } from 'express';
import { executeStatement } from '../services';

const clientRouter = Router();

clientRouter.get('/', (req, res, next) => {
  executeStatement('EXECUTE clientViewSelectAll').then(({ data }) => {
    res.send(data);
  });
});

clientRouter.post('/insert', (req, res, next) => {
  const { clientDriversLicenceNumber } = req.body;
  const { clientFirstName } = req.body;
  const { clientLastName } = req.body;
  const { clientAddress } = req.body;
  const { clientPostalCode } = req.body;
  const { clientCity } = req.body;
  const { clientCountry } = req.body;
  const { clientEmail } = req.body;
  const { clientPhoneNumber } = req.body;

  const query =
    'EXECUTE clientInsert ' +
    `N'${clientDriversLicenceNumber}', ` +
    `N'${clientFirstName}', ` +
    `N'${clientLastName}', ` +
    `N'${clientAddress}', ` +
    `N'${clientPostalCode}', ` +
    `N'${clientCity}', ` +
    `N'${clientCountry}', ` +
    `N'${clientEmail}', ` +
    `N'${clientPhoneNumber}'`;

  executeStatement(query).then(({ data }) => {
    res.send(data);
  });
});

export default clientRouter;
