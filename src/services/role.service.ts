const BaseService = require("./BaseService");
import Role from '../models/role.model';

class RoleService extends BaseService {
  constructor() {
    super(Role);
  }

  async insertMany(data: Array<any>) {
    try {  
      return await Role.insertMany(data);
    } catch (error) {
      throw error;
    }
  }  

  // You can add model-specific methods here
}

module.exports = new RoleService();
