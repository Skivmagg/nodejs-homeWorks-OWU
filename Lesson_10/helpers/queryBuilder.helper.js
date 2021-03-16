module.exports = (query = {}) => {
    const {
        limit = 20,
        page = 1,
        sortBy = 'createdAt',
        order = 'asc',
        ...filters
    } = query;
    const skip = (page - 1) * limit;
    const orderBy = order === 'asc' ? -1 : 1;

    const sort = { [sortBy]: orderBy };

    const keys = Object.keys(filters);
    const filterObject = {};

    return {
        limit, page, skip, keys, filterObject, sort, filters
    };
};
