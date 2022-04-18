import { Router } from 'express';
import { executeStatement } from '../services';

const requestRouter = Router();

requestRouter.get('/', (req, res, next) => {
  executeStatement('EXECUTE rentRequestViewSelectAll').then(({ data }) => {
    res.send(data);
  });
});

requestRouter.get('/new', (req, res, next) => {
  executeStatement('EXECUTE rentRequestNewSelect').then(({ data }) => {
    res.send(data);
  });
});

requestRouter.get('/open', (req, res, next) => {
  executeStatement('EXECUTE rentRequestOpenSelect').then(({ data }) => {
    res.send(data);
  });
});

requestRouter.get('/rentStatus', (req, res, next) => {
  executeStatement('EXECUTE rentStatusSelect').then(({ data }) => {
    res.send(data);
  });
});

requestRouter.get('/byCode/:id', (req, res, next) => {
  const { id } = req.params;
  executeStatement(`EXECUTE rentRequestSelectByCode ${id}`).then(({ data }) => {
    res.send(data);
  });
});

requestRouter.post('/insert', (req, res, next) => {
  const { vehicleCode } = req.body;
  const { clientCode } = req.body;
  const { rentStartDate } = req.body;
  const { rentStartTime } = req.body;
  const { rentEndDate } = req.body;
  const { rentEndTime } = req.body;
  const { rentPrice } = req.body;
  const { rentStatusCode } = req.body;
  const { rentDescription } = req.body;
  const { userCode } = req.body;

  const query =
    'EXECUTE rentRequestInsert ' +
    `N'${vehicleCode}', ` +
    `N'${clientCode}', ` +
    `N'${rentStartDate}', ` +
    `N'${rentStartTime}', ` +
    `N'${rentEndDate}', ` +
    `N'${rentEndTime}', ` +
    `N'${rentPrice}', ` +
    `N'${rentStatusCode}', ` +
    `N'${rentDescription}', ` +
    `N'${userCode}'`;

  executeStatement(query).then(({ data }) => {
    res.send(data);
  });
});

requestRouter.put('/update', (req, res, next) => {
  const { rentCode } = req.body;
  const { vehicleCode } = req.body;
  const { rentStartDate } = req.body;
  const { rentStartTime } = req.body;
  const { rentEndDate } = req.body;
  const { rentEndTime } = req.body;
  const { rentPrice } = req.body;
  const { rentStatusCode } = req.body;
  const { rentDescription } = req.body;
  const { userCode } = req.body;

  const query =
    'EXECUTE rentRequestUpdate ' +
    `N'${rentCode}', ` +
    `N'${vehicleCode}', ` +
    `N'${rentStartDate}', ` +
    `N'${rentStartTime}', ` +
    `N'${rentEndDate}', ` +
    `N'${rentEndTime}', ` +
    `N'${rentPrice}', ` +
    `N'${rentStatusCode}', ` +
    `N'${rentDescription}', ` +
    `N'${userCode}'`;

  executeStatement(query).then(({ data }) => {
    res.send(data);
  });
});

export default requestRouter;
