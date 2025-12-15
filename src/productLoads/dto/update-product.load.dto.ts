import { PartialType } from '@nestjs/mapped-types';
import { CreateProductLoadDto } from './create-product.load.dto';

export class UpdateProductLoadDto extends PartialType(CreateProductLoadDto) {}
