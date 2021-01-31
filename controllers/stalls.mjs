export default function initStallsController(db) {
  const index = async (req, res) => {
    try {
      const allStalls = await db.Stall.findAll();
      console.log(allStalls);
      res.send(allStalls);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    index,
  };
}
