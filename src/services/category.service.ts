const BaseService = require("./BaseService");
import Category from '../models/category.model';

class CategoryService extends BaseService {
  constructor() {
    super(Category);
  }

  async findOrCreate(categoryNames: Array) {

    const createdCategories = [];
    for (const categoryName of categoryNames) {      
      let category = await this.getByField({ name: categoryName });      
      if (!category) {
        category = await this.create({ name: categoryName });
      }

      createdCategories.push(category._id);
    }
    return createdCategories; 
  }
}

module.exports = new CategoryService();
