import { Router } from 'express';
import { executeStatement } from '../services';

const vehicleRouter = Router();

vehicleRouter.get('/', (req, res, next) => {
  executeStatement('EXECUTE vehicleSelectAll').then(({ data }) => {
    res.send(data);
  });
});

vehicleRouter.get('/short', (req, res, next) => {
  executeStatement('EXECUTE vehicleSelectShort').then(({ data }) => {
    res.send(data);
  });
});

vehicleRouter.post('/insert', (req, res, next) => {
  const { vehicleModel } = req.body;
  const { vehicleTypeCode } = req.body;
  const { vehicleManufacturerTypeCode } = req.body;
  const { vehicleEngineTypeCode } = req.body;
  const { vehicleTransmisionTypeCode } = req.body;
  const { vehicleDoors } = req.body;
  const { vehicleSeats } = req.body;
  const { vehicleManufactureYear } = req.body;
  const { vehicleColor } = req.body;
  const { vehicleAirCondition } = req.body;
  const { vehicleAudioSystem } = req.body;
  const { vehicleGPS } = req.body;
  const { vehicleAdapted } = req.body;
  const { vehicleDescription } = req.body;
  const { vehiclePrice } = req.body;
  const { vehicleStatusCode } = req.body;

  const query =
    'EXECUTE vehicleInsert ' +
    `N'${vehicleModel}', ` +
    `N'${vehicleTypeCode}', ` +
    `N'${vehicleManufacturerTypeCode}', ` +
    `N'${vehicleEngineTypeCode}', ` +
    `N'${vehicleTransmisionTypeCode}', ` +
    `N'${vehicleDoors}', ` +
    `N'${vehicleSeats}', ` +
    `N'${vehicleManufactureYear}', ` +
    `N'${vehicleColor}', ` +
    `N'${vehicleAirCondition}', ` +
    `N'${vehicleAudioSystem}', ` +
    `N'${vehicleGPS}', ` +
    `N'${vehicleAdapted}', ` +
    `N'${vehicleDescription}', ` +
    `N'${vehiclePrice}', ` +
    `N'${vehicleStatusCode}'`;

  executeStatement(query).then(({ data }) => {
    res.send(data);
  });
});

vehicleRouter.put('/update', (req, res, next) => {
  const { vehicleCode } = req.body;
  const { vehicleModel } = req.body;
  const { vehicleTypeCode } = req.body;
  const { vehicleManufacturerTypeCode } = req.body;
  const { vehicleEngineTypeCode } = req.body;
  const { vehicleTransmisionTypeCode } = req.body;
  const { vehicleDoors } = req.body;
  const { vehicleSeats } = req.body;
  const { vehicleManufactureYear } = req.body;
  const { vehicleColor } = req.body;
  const { vehicleAirCondition } = req.body;
  const { vehicleAudioSystem } = req.body;
  const { vehicleGPS } = req.body;
  const { vehicleAdapted } = req.body;
  const { vehicleDescription } = req.body;
  const { vehiclePrice } = req.body;
  const { vehicleStatusCode } = req.body;

  const query =
    'EXECUTE vehicleUpdate ' +
    `N'${vehicleCode}', ` +
    `N'${vehicleModel}', ` +
    `N'${vehicleTypeCode}', ` +
    `N'${vehicleManufacturerTypeCode}', ` +
    `N'${vehicleEngineTypeCode}', ` +
    `N'${vehicleTransmisionTypeCode}', ` +
    `N'${vehicleDoors}', ` +
    `N'${vehicleSeats}', ` +
    `N'${vehicleManufactureYear}', ` +
    `N'${vehicleColor}', ` +
    `N'${vehicleAirCondition}', ` +
    `N'${vehicleAudioSystem}', ` +
    `N'${vehicleGPS}', ` +
    `N'${vehicleAdapted}', ` +
    `N'${vehicleDescription}', ` +
    `N'${vehiclePrice}', ` +
    `N'${vehicleStatusCode}'`;

  executeStatement(query).then(({ data }) => {
    res.send(data);
  });
});

vehicleRouter.get('/byCode/:id', (req, res, next) => {
  const { id } = req.params;
  executeStatement(`EXECUTE vehicleSelectByVehicleCode ${id}`).then(({ data }) => {
    res.send(data);
  });
});

vehicleRouter.get('/formByCode/:id', (req, res, next) => {
  const { id } = req.params;
  executeStatement(`EXECUTE vehicleFormSelectByVehicleCode ${id}`).then(({ data }) => {
    res.send(data);
  });
});

vehicleRouter.get('/vehicleView', (req, res, next) => {
  executeStatement('EXECUTE vehicleViewSelectAll').then(({ data }) => {
    res.send(data);
  });
});

vehicleRouter.get('/manufacturer', (req, res, next) => {
  executeStatement('EXECUTE vehicleManufacturerTypeSelect').then(({ data }) => {
    res.send(data);
  });
});

vehicleRouter.get('/type', (req, res, next) => {
  executeStatement('EXECUTE vehicleTypeSelect').then(({ data }) => {
    res.send(data);
  });
});

vehicleRouter.get('/engine', (req, res, next) => {
  executeStatement('EXECUTE vehicleEngineTypeSelect').then(({ data }) => {
    res.send(data);
  });
});

vehicleRouter.get('/transmision', (req, res, next) => {
  executeStatement('EXECUTE vehicleTransmisionTypeSelect').then(({ data }) => {
    res.send(data);
  });
});

vehicleRouter.get('/status', (req, res, next) => {
  executeStatement('EXECUTE vehicleStatusSelect').then(({ data }) => {
    res.send(data);
  });
});

/** ******** IMAGES ********* */
vehicleRouter.get('/vehicleImages/:id', (req, res, next) => {
  const { id } = req.params;
  executeStatement(`EXECUTE vehicleImagesSelect ${id}`).then(({ data }) => {
    res.send(data);
  });
});

vehicleRouter.put('/vehicleImagesDefaultUpdate', (req, res, next) => {
  const { vehicleCode } = req.body;
  const { imageCode } = req.body;

  const query = 'EXECUTE vehicleImagesDefaultUpdate ' + `'${vehicleCode}', ` + `'${imageCode}'`;

  executeStatement(query).then(({ data }) => {
    res.send(data);
  });
});

vehicleRouter.delete('/vehicleImagesDelete/:vehicleCode/:imageCode', (req, res, next) => {
  const { vehicleCode } = req.params;
  const { imageCode } = req.params;

  const query = `EXECUTE vehicleImagesDelete ${vehicleCode}, ${imageCode}`;

  executeStatement(query).then(({ data }) => {
    res.send(data);
  });
});

export default vehicleRouter;
