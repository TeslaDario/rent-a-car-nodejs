import { Router } from 'express';

import userRouter from './user';
import companyRouter from './company';
import vehicleRouter from './vehicle';
import clientRouter from './client';
import requestRouter from './request';
import uploadRouter from './upload';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/company', companyRouter);
routes.use('/vehicle', vehicleRouter);
routes.use('/client', clientRouter);
routes.use('/request', requestRouter);
routes.use('/upload', uploadRouter);

export default routes;
