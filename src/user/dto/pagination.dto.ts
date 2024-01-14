import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PaginationQueryDTO {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  perPage: number;

  @IsOptional()
  @IsString()
  name: string;
}
