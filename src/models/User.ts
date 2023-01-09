import { Model, Modifiers } from 'objection';
import { Role } from 'src/common';

interface Address {
  street: string;
  city: string;
  zipCode: string;
}

export default class User extends Model {
  // Table name is the only required property.
  static tableName = 'users';

  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  username!: string;
  password!: string;
  role!: Role;
  address?: Address;

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: 'object',
    required: [
      'firstName',
      'lastName',
      'email',
      'username',
      'password',
      'role',
    ],

    properties: {
      id: { type: 'integer' },
      firstName: { type: 'string', minLength: 1, maxLength: 255 },
      lastName: { type: 'string', minLength: 1, maxLength: 255 },
      email: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
      role: { type: 'string' },

      address: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          city: { type: 'string' },
          zipCode: { type: 'string' },
        },
      },
    },
  };

  // Modifiers are reusable query snippets that can be used in various places.
  static modifiers: Modifiers = {
    // Our example modifier is a a semi-dumb fuzzy name match. We split the
    // name into pieces using whitespace and then try to partially match
    // each of those pieces to both the `firstName` and the `lastName`
    // fields.
    searchByName(query, name) {
      // This `where` simply creates parentheses so that other `where`
      // statements don't get mixed with the these.
      query.where((query) => {
        for (const namePart of name.trim().split(/\s+/)) {
          for (const column of ['firstName', 'lastName']) {
            query.orWhereRaw('lower(??) like ?', [
              column,
              namePart.toLowerCase() + '%',
            ]);
          }
        }
      });
    },
  };

  // This object defines the relations to other models. The relationMappings
  // property can be a thunk to prevent circular dependencies.
  static relationMappings = () => ({});
}
