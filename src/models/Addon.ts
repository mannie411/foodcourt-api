import { Model, Modifiers } from 'objection';
import AddonCategory from './AddonCategory';
import Brand from './Brand';

export default class Addon extends Model {
  // Table name is the only required property.
  static tableName = 'addons';

  id!: number;
  name!: string;
  desc?: string;
  price!: string;

  brandId!: number;
  categoryId?: number;

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: 'object',
    required: ['name', 'price', 'brandId'],

    properties: {
      id: { type: 'integer' },
      brandId: { type: 'integer' },
      categoryId: { type: 'integer' },
      name: { type: 'string' },
      price: { type: 'string' },
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
  static relationMappings = () => ({
    brands: {
      relation: Model.BelongsToOneRelation,
      modelClass: Brand,
      join: {
        from: 'addons.brandId',
        to: 'brands.addonId',
      },
    },
    category: {
      relation: Model.BelongsToOneRelation,
      modelClass: AddonCategory,
      join: {
        from: 'addons.categoryId',
        to: 'addons_category.addonId',
      },
    },
  });
}
