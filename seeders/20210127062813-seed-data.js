module.exports = {
  up: async (queryInterface) => {
    /*= ===============================================
        USERS
    ================================================ */
    const usersList = [
      {
        email: 'admin_1@gmail.com',
        password: 'password1',
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    try {
      const result = await queryInterface.bulkInsert('users', usersList);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    /*= ===============================================
        CATEGORIES
    ================================================ */
    const categoriesList = [
      {
        name: 'Malay Food',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Chinese Food',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Indian Food',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    try {
      const result = await queryInterface.bulkInsert('categories', categoriesList);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    /*= ===============================================
        STALLS
    ================================================ */
    const stallsList = [
      {
        unit_num: 1,
        name: 'Briyani Power',
        category_id: 3,
        operating_hours: '7.00AM TO 8.00PM ',
        menu: ['Briyani, Roti Prata, Thosai'],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_num: 2,
        name: 'Chicken Rice King',
        category_id: 2,
        operating_hours: '7.00AM TO 8.00PM ',
        menu: ['Steamed Chicken Rice, Roasted Chicken Rice, Chicken Soup, Fried Beansprout with Salted Fish'],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_num: 3,
        name: 'Dunman Roasted Meat Specialist',
        category_id: 2,
        operating_hours: '7.00AM TO 8.00PM ',
        menu: ['Roasted Three-Layer Pork, Char Siew, Soya Sauce Chicken'],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_num: 4,
        name: 'Fatima\'s Delights',
        category_id: 1,
        operating_hours: '7.00AM TO 8.00PM ',
        menu: ['Ayam Goreng, Maggie Goreng, Mee Rebus, Mee Siam'],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_num: 5,
        name: 'Fei Zai Economic Rice',
        category_id: 2,
        operating_hours: '7.00AM TO 8.00PM ',
        menu: ['Egg Toufu with Minced Pork, Fried Chicken, Steamed Egg, Fried Egg, Chicken Curry, Kailan with Garlic'],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    try {
      const result = await queryInterface.bulkInsert('stalls', stallsList);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('stalls', null, {});
    await queryInterface.bulkDelete('categories', null, {});
  },
};
