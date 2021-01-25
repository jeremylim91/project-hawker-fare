export default function initBillsController(db) {
  const create = async (req, res) => {
    const { newBill } = req.body;

    console.log('newBill is:');
    console.log(newBill);

    console.log('creating new bill');
    try {
      const newItemInstance = await db.Bill.create({
        name: newBill,
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log('newItemInstance is:');
      console.log(newItemInstance);
      res.send(newItemInstance);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    create,
  };
}
