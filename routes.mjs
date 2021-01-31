import { resolve } from 'path';
import db from './models/index.mjs';
import initStallsController from './controllers/stalls.mjs';
import initCategoriesController from './controllers/categories.mjs';

export default function routes(app) {
  const stallsController = initStallsController(db);
  const categoriesController = initCategoriesController(db);
  // get a list of all the stalls
  app.get('/getStallDetails', stallsController.index);
  // get a list of all the food categories (i.e. cuisines)
  app.get('/getCategories', categoriesController.index);

  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
