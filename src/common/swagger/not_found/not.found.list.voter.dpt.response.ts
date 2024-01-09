// Contoh hasil swagger
import { ApiProperty } from '@nestjs/swagger';

export class listVoterDptNearbyResponseNotFound {
  @ApiProperty({ example: '0' })
  total_page: number;

  @ApiProperty({ example: '0' })
  total_data: number;

  @ApiProperty({ example: '0' })
  current_page: number;

  @ApiProperty({ example: '0' })
  current_data: number;

  @ApiProperty({ example: [] })
  data: Array<object>;
}
