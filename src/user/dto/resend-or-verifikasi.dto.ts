import {
  IsNotEmpty,
  isNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResendOrVerif {
  @IsNotEmpty()
  @IsNumberString()
  whatsapp: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  otp: string;
}
