import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../../../user/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UserResSuccesCreate extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Id auto generate dari mongodb',
    example: '66580386572c487d00eef243',
    uniqueItems: true,
  })
  _id: string;
  @ApiProperty({
    description: 'silahkan masukan username yang akan di gunakan untuk login',
    example: '081234567890123',
    uniqueItems: true,
  })
  username: string;
  @ApiHideProperty()
  password?: string;

  @ApiProperty({
    description: 'orang yang menyewa',
    example: 'PDPxxxx',
    uniqueItems: true,
  })
  tenant_id: string;

  @ApiProperty({
    isArray: true,
    required: true,
    type: String,
    example: ['ada', 'tiada', 'ada'],
  })
  role: string[];

  @ApiProperty({
    isArray: true,
    required: true,
    type: String,
    example: ['ada', 'tiada', 'ada'],
  })
  applications: string[];
}
