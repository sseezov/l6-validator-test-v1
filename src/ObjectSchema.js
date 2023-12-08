export default class ObjectSchema {
  constructor(object = {}) {
    this.object = object;
  }

  shape(object) {
    return new ObjectSchema(object);
  }

  isValid(obj) {
    const inner = (obj, acc) => {
      const entries = Object.entries(obj);
      return entries.flatMap(([key, value]) => {
        if (typeof value === 'object' && !Array.isArray(value)) {
          return inner(value, acc[key]);
        }
        return acc[key].isValid(value);
      });
    };
    return !inner(obj, this.object).includes(false);
  }
}
