import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, transaction } from 'objection';
import { Addon, AddonCategory, Brand } from 'src/models';

@Injectable()
export class BrandService {
  constructor(
    @Inject('Brand') private brandModel: ModelClass<Brand>,
    @Inject('Addon') private addonModel: ModelClass<Addon>,
    @Inject('AddonCategory') private categoryModel: ModelClass<AddonCategory>,
  ) {}

  async findAll(id: number) {
    const brand = await this.brandModel.query().findById(id);
    const addons = await brand.$relatedQuery('addons');

    delete brand.addonId;

    return { brand, addons };
  }

  findOne(id: number) {
    return this.brandModel.query().findById(id);
  }

  createBrand(payload: Partial<Brand>) {
    return this.brandModel.query().insert(payload).returning('*');
  }

  createAddons(payload: Partial<Addon>) {
    return this.addonModel.query().insert(payload).returning('*');
  }

  update(id: number, props: Partial<Brand>) {
    return this.brandModel
      .query()
      .patch(props)
      .where({ id })
      .returning('*')
      .first();
  }

  delete(id: number) {
    return this.brandModel.query();
  }
}
