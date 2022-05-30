const {ParameterizedQuery: PQ} = require('pg-promise');

class CategoryService {

  static async createCategory(db, categories) {
    try {
      categories.map(async (category) => {
        const addCategory = new PQ('INSERT INTO animal_categories(category) VALUES($1)');
        addCategory.values = [category];
        await db.one(addCategory);
      });
      return categories;
    } catch(e) {
      throw e;
    }
  }

  static async removeCategorybyId(db, id) {
    try {
      const res = await db.one('DELETE FROM animal_categories WHERE id = $1', id);
      return res;
    } catch(e) {
      throw e;
    }
  }
}

module.exports = CategoryService;