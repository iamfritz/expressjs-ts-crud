const BaseService = require("./BaseService");
import User from '../models/user.model';

class UserService extends BaseService {
  constructor() {
    super(User);
  }

  // You can add model-specific methods here
}

module.exports = new UserService();
