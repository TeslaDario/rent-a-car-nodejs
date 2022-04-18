import { Router } from 'express';
import { executeStatement } from '../services';

const companyRouter = Router();

companyRouter.get('/', (req, res, next) => {
  executeStatement('EXECUTE rentalCompanySelect').then(({ data }) => {
    res.send(data);
  });
});

companyRouter.put('/update', (req, res, next) => {
  const { rentalCompanyCode } = req.body;
  const { rentalCompanyName } = req.body;
  const { rentalCompanyRegistrationCode } = req.body;
  const { rentalCompanyEmail } = req.body;
  const { rentalCompanyPhoneNumber } = req.body;
  const { rentalCompanyFaxNumber } = req.body;
  const { rentalCompanyAddress } = req.body;
  const { rentalCompanyPostalCode } = req.body;
  const { rentalCompanyCity } = req.body;
  const { rentalCompanyCountry } = req.body;
  const { rentalCompanyBusinessHours } = req.body;
  const { rentalCompanyDescription } = req.body;

  const query =
    'EXECUTE rentalCompanyUpdate ' +
    `N'${rentalCompanyCode}', ` +
    `N'${rentalCompanyName}', ` +
    `N'${rentalCompanyRegistrationCode}', ` +
    `N'${rentalCompanyEmail}', ` +
    `N'${rentalCompanyPhoneNumber}', ` +
    `N'${rentalCompanyFaxNumber}', ` +
    `N'${rentalCompanyAddress}', ` +
    `N'${rentalCompanyPostalCode}', ` +
    `N'${rentalCompanyCity}', ` +
    `N'${rentalCompanyCountry}', ` +
    `N'${rentalCompanyBusinessHours}', ` +
    `N'${rentalCompanyDescription}'`;

  executeStatement(query).then(({ data }) => {
    res.send(data);
  });
});

companyRouter.get('/dataCount', (req, res, next) => {
  executeStatement('EXECUTE dataCount').then(({ data }) => {
    res.send(data);
  });
});

export default companyRouter;
