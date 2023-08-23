const BaseService = require("./BaseService");
//import Apikey from '../models/apikey.model';
import Apikey, { IApikey } from '../models/apikey.model';


class ApikeyService extends BaseService {
  constructor() {
    super(Apikey);
  }
  // You can add model-specific methods here
}

module.exports = new ApikeyService();
