export default class ArraySchema {
  constructor(validators = []) {
    this.defaultValidator = [(arr) => Array.isArray(arr)];
    this.validators = [...this.defaultValidator, ...validators];
  }

  isValid(arr) {
    return this.validators.every((item) => item(arr));
  }

  allIntegers() {
    const validator = [(arr) => arr.every((number) => Number.isInteger(number))];
    return new ArraySchema(validator);
  }

  custom(validator) {
    const validation = [(arr) => arr.every((el) => validator(el))];
    return new ArraySchema(validation);
  }
}
