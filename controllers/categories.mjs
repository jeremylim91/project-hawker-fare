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

  const getCategoryUsingCategoryId = async (req, res) => {
    const { categoryId } = req.body;
    try {
      const categoryInstance = await db.Category.findOne({
        where: {
          id: categoryId,
        },
      });
      res.send(categoryInstance);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    index, getCategoryUsingCategoryId,
  };
}
