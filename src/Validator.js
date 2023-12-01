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
