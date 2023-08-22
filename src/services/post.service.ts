const BaseService = require("./BaseService");
import Post from '../models/post.model';

class PostService extends BaseService {
  constructor() {
    super(Post);
  }

  // You can add model-specific methods here
}

module.exports = new PostService();
