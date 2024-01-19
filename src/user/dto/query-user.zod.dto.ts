import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'


const userFieldQueryValidating = z.object({
    page: z.string(),
    perPage: z.string(),
     name: z.string().optional(),
     province: z.string().optional(),
     city: z.string().optional(),
     district: z.string().optional(),
     sub_district: z.string().optional()
})
.superRefine((obj,ctx) => {
    if(obj.city && obj.province == undefined) {
        ctx.addIssue({
           code: z.ZodIssueCode.custom,
           message:"provinsi harus terisi"
        })
    } else if(obj.district && obj.city == undefined || obj.province == undefined) {
        ctx.addIssue({
           code: z.ZodIssueCode.custom,
           message:"kota dan provinsi harus terisi"
        })
    } else if(obj.sub_district && obj.district == undefined || obj.city == undefined || obj.province == undefined) {
           ctx.addIssue({
               code: z.ZodIssueCode.custom,
               message:"kecamatan ,kota dan provinsi harus terisi"
           })
    }
});

export class QueryUserListZodDTO extends createZodDto(userFieldQueryValidating) {}