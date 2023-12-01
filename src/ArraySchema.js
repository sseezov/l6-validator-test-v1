export default class ArraySchema {
  constructor(vals) {
    this.validators = [...vals];
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value) === true);
  }

  allIntegers() {
    const validator = (arr) => arr.every((item) => Number.isInteger(item));
    return new ArraySchema([...this.validators, validator]);
  }

  custom(val) {
    const validator = (arr) => arr.every((item) => val(item));
    return new ArraySchema([...this.validators, validator]);
  }
}
