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

  createAddonsCategory(payload: Partial<AddonCategory>) {
    return this.categoryModel.query().insert(payload).returning('*');
  }

  async findOneAddon(payload: { brandId: number; addonId: number }) {
    const brand = await this.findOne(payload.brandId);
    const addon = brand.$relatedQuery('addons').where('id', payload.addonId);
    return addon;
  }

  async updateAddon(payload: { brandId: number; addonId: number; props }) {
    const { brandId, addonId, props } = payload;
    const brand = await this.findOne(brandId);
    const addon = brand
      .$relatedQuery('addons')
      .patch(props)
      .where('id', addonId)
      .returning('*')
      .first();

    return addon;
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

  async deleteAddon(payload: { brandId: number; addonId: number }) {
    const { brandId, addonId } = payload;
    const brand = await this.findOne(brandId);
    const addon = brand
      .$relatedQuery('addons')
      .deleteById(addonId)
      .where('id', addonId);
    return addon;
  }
}
