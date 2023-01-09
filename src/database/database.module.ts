import { Global, Module } from '@nestjs/common';
import { knex } from 'knex';
import { Model } from 'objection';
import * as config from '../../knexConfig';
import { Brand, User, Addon, AddonCategory } from '../models';

const models = [Brand, User, Addon, AddonCategory];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knexConfig = knex(config);
      Model.knex(knexConfig);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
