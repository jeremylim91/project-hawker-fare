import { resolve } from 'path';
import db from './models/index.mjs';
import initStallsController from './controllers/stalls.mjs';
import initCategoriesController from './controllers/categories.mjs';
import initUsersController from './controllers/users.mjs';
import initAmendmentsController from './controllers/amendments.mjs';

export default function routes(app) {
  const stallsController = initStallsController(db);
  const categoriesController = initCategoriesController(db);
  const usersController = initUsersController(db);
  const amendmentsController = initAmendmentsController(db);
  // get a list of all the stalls
  app.get('/getStallDetails', stallsController.index);
  // get a list of all the food categories (i.e. cuisines)

  app.get('/getCategories', categoriesController.index);
  // use the categoryId to get the category name
  app.post('/getCategoryUsingCategoryId', categoriesController.getCategoryUsingCategoryId);

  // on page load, check if user's credentials are legit
  app.post('/checkForExistingLogin', usersController.checkForExistingLogin);
  // allow the user to login
  app.post('/verifyLogin', usersController.verifyLogin);

  // allow admin to approve an update by guests, saving it into the main db
  app.post('/submitUpdatedStall', stallsController.createUpdatedStall);

  // allow guests to submit suggested amendments
  app.post('/submitNewAmendment', amendmentsController.create);
  // allow admin to get a list of all suggested amendments
  app.get('/getListOfAmendments', amendmentsController.index);
  // change status of amendment so that it no longer gets rendered
  app.post('/updateAmendment', amendmentsController.updateStatus);

  // special JS page. Include the webpack index.html file
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
