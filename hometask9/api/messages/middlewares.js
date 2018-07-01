const { celebrate } = require('celebrate');


exports.validate = schema => celebrate(schema, {
  stripUnknown: {
    objects: true,
  },
});
