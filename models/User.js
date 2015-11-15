import validator from 'is-my-json-valid';
import schema from './User.schema.json';

const __validate = validator(schema);

export default class User {
  constructor(params) {
    this.id = params.id;
    this.key = params.key;
    this.email = params.email;
    this.name = params.name;
    this.imageUrl = params.imageUrl;
    this.bio = params.bio;
  }

  toJSON() {
    return Object(this);
  }

  static isValid(params) {
    return new Promise((resolve, reject) => {
      if (!__validate(params)) {
        return reject(new TypeError('USER_JSON_SHAPE_INVALID'));
      }

      return resolve(params);
    });
  }

  static fromJSON(params) {
    return User.isValid(params)
      .then(params => {
        const user = new User(params);

        return Promise.resolve(user);
      });
  }
}
