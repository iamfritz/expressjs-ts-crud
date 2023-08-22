const BaseService = require("./BaseService");
import Category from '../models/category.model';

class CategoryService extends BaseService {
  constructor() {
    super(Category);
  }

  // You can add model-specific methods here
}

module.exports = new CategoryService();
