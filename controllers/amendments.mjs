export default function initAmendmentsController(db) {
  // db query to create a new suggested amendment entry
  const create = async (req, res) => {
    // get the items out of the body
    const {
      id, unitNum, name, categoryId, operatingHours,
    } = req.body.selectedStall;

    let { menu } = req.body.selectedStall;
    console.log('menu is');
    console.log(menu);
    // convert menu from str to an array (it's not an array once the user adds stuff into menu)
    if (Array.isArray(menu) === false) {
      // use split syntax to convert it
      menu = menu.split(',');
      // console.log('menu after split:');
      // console.log(menu);
    }

    let userEmail = null;
    try {
      if (req.cookies.userId !== undefined) {
      // get the user's userId based on his cookies (only his email is stored)
        const userInstance = await db.User.findOne({
          where: {
            email: req.cookies.userId,
          },
        });
        userEmail = userInstance.id;
      } else {
        userEmail = 1;
      }

      const newAmendmentInstance = db.Amendment.create({
        userId: userEmail,
        unitNum,
        name,
        categoryId,
        operatingHours,
        menu,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log('newAmendmentInstance is:');
      console.log(newAmendmentInstance);
      res.send();
    } catch (error) {
      console.log(error);
    }
  };
  // db query to get all amendments to display for high-level review
  const index = async (req, res) => {
    try {
      const instancesOfAllSuggestedAmendments = await db.Amendment.findAll({
        where: {
          status: 'pending',
        },
      });
      console.log('instancesOfAllSuggestedAmendments is:');
      console.log(instancesOfAllSuggestedAmendments);

      res.send(instancesOfAllSuggestedAmendments);
    } catch (error) {
      console.log(error);
    }
  };

  // db update to change e status of an amendeded stall to "approved", so tt it won't be displayed
  const updateStatus = async (req, res) => {
    const {
      id, unitNum, name, categoryId, operatingHours, menu,
    } = req.body.selectedAmendment;

    console.log('id in updateStatus is:');
    console.log(id);
    // get instance from amendments db
    try {
      const amendmentInstance = await db.Amendment.findOne({
        where: {
          id,
        },
      });
      amendmentInstance.status = 'approved';
      amendmentInstance.save();
    } catch (error) {
      console.log(error);
    }
  };

  return { create, index, updateStatus };
}
