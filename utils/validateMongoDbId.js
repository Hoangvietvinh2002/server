function validateMongoDbId(id) {
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new Error('ID không hợp lệ');
    }
    else{return true}
  }


module.exports = validateMongoDbId