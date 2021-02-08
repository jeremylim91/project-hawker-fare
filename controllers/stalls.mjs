import getStallIndexFromUnitNum from '../src/helperFns/get-stall-index.mjs';

export default function initStallsController(db) {
  // fn that gets all stalls and arranges them in order of their unit num
  const index = async (req, res) => {
    try {
      const allActiveStalls = await db.Stall.findAll(
        // find all stalls that is "active" (inactive stalls are those with outdated details)
        {
          where: {
            isActive: true,
          },
        },
      );

      // sort the data according to the unit num
      // fn to convert stallNum frm #xx-yy to yy where yy is an int
      // const getStallIndex = (hexedUnitNum) => {
      //   const indexOfhyphen = (hexedUnitNum.indexOf('-') + 1);
      //   const unitIndex = Number(hexedUnitNum.substr(indexOfhyphen));
      //   return unitIndex;
      // };

      const compare = (a, b) => {
        if (getStallIndexFromUnitNum(a.unitNum) < getStallIndexFromUnitNum(b.unitNum)) {
          return -1;
        }
        if (getStallIndexFromUnitNum(a.unitNum) > getStallIndexFromUnitNum(b.unitNum)) {
          return +1;
        }
        return 0;
      };

      allActiveStalls.sort(compare);
      console.log('sorted allStalls is:');
      console.log(allActiveStalls);

      res.send(allActiveStalls);
    } catch (error) {
      console.log(error);
    }
  };

  const createUpdatedStall = async (req, res) => {
    const {
      id, unitNum, name, categoryId, operatingHours, menu,
    } = req.body.selectedAmendment;

    try {
    // change all existing versions of this stall to inactive.
      const allExistingActiveInstancesOfMatchingStall = await db.Stall.findAll(
        {
          where: {
            unitNum,
            isActive: true,
          },
        },
      );
      allExistingActiveInstancesOfMatchingStall.forEach((element) => {
        element.isActive = false;
        // save the change:
        element.save();
      });
      // i tried using this (below) to update the db (line 59), but it didn't work:
      // allExistingActiveInstancesOfMatchingStall.save();

      // create a new entry in stalls, using the approved input. set isActive to true
      const newStallInstance = await db.Stall.create({
        unitNum,
        name,
        categoryId,
        operatingHours,
        menu,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.send();
    } catch (error) {
      console.log(error);
    }
  };
  return {
    index, createUpdatedStall,
  };
}
