// Contoh exception swagger
import { ApiProperty } from '@nestjs/swagger';

export class listVoterDptNearbyResponse {
  @ApiProperty({ example: '1' })
  total_page: number;

  @ApiProperty({ example: '1' })
  total_data: number;

  @ApiProperty({ example: '1' })
  current_page: number;

  @ApiProperty({ example: '1' })
  current_data: number;

  @ApiProperty({
    example: [
      {
        _id: '650d1c8043608c8f18096fe1',
        province_name: 'BALI',
        city_name: 'BADUNG',
        district_name: 'KUTA',
        sub_district_name: 'TUBAN',
        no_tps: '22',
        name: "A'AN",
        place_of_birth: '',
        no_ktp: null,
        rt: '0',
        rw: '0',
        village: '',
        address: '',
        description: '',
        added: [],
        accepted_tag_by: null,
        tagged: [],
        last_answer: '',
        isImpersonate: false,
        programs: [],
        isVerified: true,
        isDeleted: false,
        phoneNumber: '',
        tenantId: '',
        updated_at: '',
        source: 'dpt 2024',
        isMember: false,
        sub_district: '6320271d975d447ce930aaf9',
        district: '6320271d975d447ce930aaf8',
        city: '6320271d975d447ce930aaf7',
        province: '6320271d975d447ce930aa2d',
      },
    ],
  })
  data: Array<object>;
}
export class getAnswers {
  @ApiProperty({
    example: ['Ajojing ala ala ajojing'],
  })
  answer: Array<any>;
}
