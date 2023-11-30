import ArraySchema from "./ArraySchema.js";
import NumberSchema from "./NumberSchema.js";
import ObjectSchema from "./ObjectSchema.js";

export default class Validator {
  number() {
    return new NumberSchema()
  }
  array() {
    return new ArraySchema([(arr) => Array.isArray(arr)])
  }
  object(){
    return new ObjectSchema()
  }
}

const v = new Validator();

const schema = v.object().shape({
  num: v.number(),
  obj: {
    array: v.array().allIntegers(),
    innerObj: {
      num: 2,
      deepestObj: {
        num: 5
      }
    }
  }
});

schema.isValid({ num: 54, obj: { array: [1,2], innerObj: { num: 2, deepestObj: { num: 5 }}} })