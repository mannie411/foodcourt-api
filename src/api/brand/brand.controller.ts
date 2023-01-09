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
import { Addon, Brand } from 'src/models';
import { BrandService } from './brand.service';

@Controller('brands')
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

  @Get(':brandId/addons/:addonId:')
  getAddonsMeal() {
    return null;
  }

  @Patch(':brandId/addons/:addonId')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  updateAddons() {
    return null;
  }

  @Delete(':brandId/addons/:addonId:')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  deleteAddons() {
    return null;
  }

  @Post(':brandId/addon-categories')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  createAddonsCategory() {
    return null;
  }
}
