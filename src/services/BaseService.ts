class BaseService {
  constructor(Model) {
    this.Model = Model;
  }
  async create(data: Array<any>) {
    try {
      const model = new this.Model(data);
      await model.save();
      return model;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: Array<any>, options: Array<any>) {
    try {
      const model = await this.Model.findByIdAndUpdate(id, data, options);
      return model;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const model = await this.Model.findByIdAndDelete(id);
      return model;
    } catch (error) {
      throw error;
    }
  }

  async getAll(filter: Array<any>) {
    try {
      const models = await this.Model.find(filter);
      return models;
    } catch (error) {
      throw error;
    }
  }

  async get(id: string) {
    try {
      const model = await this.Model.findById(id);
      return model;
    } catch (error) {
      throw error;
    }
  }  

  async getByField(field: Array<any>) {
    try {
      const model = await this.Model.findOne(field);
      return model;
    } catch (error) {
      throw error;
    }
  }

  async getWithPopulation(id: string, field: Array<any>) {
    try {
      const model = await this.Model.findById(id).populate(field);
      return model;
    } catch (error) {
      throw error;
    }
  }

  async getAllWithPopulation(filter: Array<any>, field: string) {
    try {
      const models = await this.Model.find(filter).populate(field);
      return models;
    } catch (error) {
      throw error;
    }
  }  
}

module.exports = BaseService;
