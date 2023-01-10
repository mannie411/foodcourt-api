import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/common';
import { Roles } from 'src/decorators/roles.decorators';
import { RolesGuard } from 'src/guards/roles.guard';
import { Addon, AddonCategory, Brand } from 'src/models';
import { BrandService } from './brand.service';

@Controller('api/brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Post()
  createBrands(@Body() payload: Partial<Brand>) {
    return this.brandService.createBrand(payload);
  }

  @Get(':brandId/addons/')
  getBrandsAddons(@Param() params) {
    return this.brandService.findAll(params.brandId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  @Post(':brandId/addons')
  createAddons(@Body() payload: Partial<Addon>) {
    return this.brandService.createAddons(payload);
  }

  @Get(':brandId/addons/:addonId')
  getAddonsMeal(@Param() params) {
    const payload = { brandId: params.brandId, addonId: params.addonId };
    return this.brandService.findOneAddon(payload);
  }

  @Patch(':brandId/addons/:addonId')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  updateAddons(@Param() params, @Body() payload) {
    const data = {
      brandId: params.brandId,
      addonId: params.addonId,
      props: payload,
    };
    return this.brandService.updateAddon(data);
  }

  @Delete(':brandId/addons/:addonId')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  deleteAddons(@Param() params) {
    const payload = { brandId: params.brandId, addonId: params.brandId };
    return this.brandService.deleteAddon(payload);
  }

  @Post(':brandId/addon-categories')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  createAddonsCategory(@Body() payload: Partial<AddonCategory>) {
    return this.brandService.createAddonsCategory(payload);
  }
}
