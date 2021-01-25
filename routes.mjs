import { resolve } from 'path';
import db from './models/index.mjs';
import initBillsController from './controllers/bills.mjs';

export default function routes(app) {
  const billsController = initBillsController(db);

  app.post('/createNewBill', billsController.create);

  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
