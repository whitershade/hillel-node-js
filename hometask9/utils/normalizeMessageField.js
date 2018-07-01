module.exports = (object = {}) => { // eslint-disable-line
  return Object.keys(object).reduce((result, fieldName) => {
    const [normalizedFieldName] = fieldName.split('-');

    return { ...result, [normalizedFieldName]: object[fieldName] };
  }, {});
};
