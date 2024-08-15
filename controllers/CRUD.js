class CrudOperations {
    constructor(model) {
      this.model = model;
    }
  
    
    async create(req, res) {
      try {
        const document = new this.model(req.body);
        await document.save();
        res.status(201).send(document);
      } catch (error) {
        res.status(400).send(error);
      }
    }
  
    // Read all documents
    async readAll(req, res) {
      try {
        const documents = await this.model.find({});
        res.status(200).send(documents);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  
    // Read a document by ID
    async readById(req, res) {
      try {
        const document = await this.model.findById(req.params.id);
        if (!document) {
          return res.status(404).send();
        }
        res.status(200).send(document);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  
    // Update a document by ID
    async update(req, res) {
      try {
        const document = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!document) {
          return res.status(404).send();
        }
        res.status(200).send(document);
      } catch (error) {
        res.status(400).send(error);
      }
    }
  
    // Delete a document by ID
    async delete(req, res) {
      try {
        const document = await this.model.findByIdAndDelete(req.params.id);
        if (!document) {
          return res.status(404).send();
        }
        res.status(200).send("deleted successfully",document);
      } catch (error) {
        res.status(400).send(error);
      }
    }
  }
  
  export default CrudOperations;
  