const BaseService = require("./BaseService");
//import Apikey from '../models/apikey.model';
import Apikey, { IApikey } from '../models/apikey.model';


class ApikeyService extends BaseService {
  constructor() {
    super(Apikey);
  }

  async findOne(field: Array<any>) {
    try {
      const model = await Apikey.findOne(field);
      return model;
    } catch (error) {
      throw error;
    }
  }

  // You can add model-specific methods here
}

module.exports = new ApikeyService();
