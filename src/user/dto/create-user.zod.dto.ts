import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const validatingCreateData = z.object({
    name: z.string(),
    age: z.number(),
    province: z.string(),
    city: z.string(),
    district: z.string(),
    sub_district: z.string(),
    province_name: z.string(),
    city_name: z.string(),
    district_name: z.string(),
    sub_district_name: z.string()
})

export class CreateUserDataZodDTO extends createZodDto(validatingCreateData) {}