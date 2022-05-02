class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };

    // Remove some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    this.query = this.query.find(queryCopy);

    return this;
  }

  pagination(pageSize) {
    const currentPage = Number(this.queryString.page) || 1;

    const skip = pageSize * (currentPage - 1);

    this.query = this.query.limit(pageSize).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
