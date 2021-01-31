export default function initCategoriesController(db) {
  const index = async (req, res) => {
    try {
      const listOfCategories = await db.Category.findAll();
      console.log(listOfCategories);
      res.send(listOfCategories);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    index,
  };
}
