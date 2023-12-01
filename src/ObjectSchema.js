import _ from 'lodash';

export default class ObjectSchema {
  constructor(shapes) {
    this.validators = shapes;
  }

  // eslint-disable-next-line
  shape(fields) {
    return new ObjectSchema(fields);
  }

  isValid(value) {
    const keys = Object.keys(value);
    if (keys.length !== Object.keys(this.validators).length) {
      return false;
    }

    const iter = (obj, key, schema) => {
      if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) {
        return schema[key].isValid(obj);
      }
      const keys = Object.keys(obj);
      const validator = schema[key];
      return keys.map((key) => iter(obj[key], key, validator));
    };
    return _.flattenDeep(keys.map((key) => iter(value[key], key, this.validators)))
      .every((val) => val);
  }
}
