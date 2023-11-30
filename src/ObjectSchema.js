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
    let validators = value;
    
    const iter = (obj, key) => {
      if ((typeof obj[key] !== 'object') && (obj[key] !== null) && (!Array.isArray(obj))) {
        return this.validators[key].isValid(obj[key])
      }
      if (Array.isArray(obj)) {
        // return obj[key].isValid(obj)
      }
      let value = obj[key];
      let keys = Object.keys(obj[key])
      console.log(key,77)
      validators = validators[key];
      return keys.map(key => iter(value, key))
    }
    return keys.map((key) => iter(value, key))
  }
}

