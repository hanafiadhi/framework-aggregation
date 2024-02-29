// import { PartialType } from '@nestjs/mapped-types';
// import { ApiProperty } from '@nestjs/swagger';
// import { createZodDto } from 'nestjs-zod';
// import { z } from 'zod';
// const hobbySchema = z
//   .object({
//     id: z.string(),
//     name: z.string().min(2),
//   })
//   .refine((obj) => Object.keys(obj).length > 0, {
//     message: 'Hobby object must not be empty',
//   });

// // Definisikan skema untuk DTO (Data Transfer Object)
// const MyDtoSchema = z.object({
//   username: z.string().min(2).max(100),
//   hobby: z.array(hobbySchema).min(1),
// });

// // Definisikan tipe untuk DTO
// type MyDto = z.infer<typeof MyDtoSchema>;

// export { MyDtoSchema, MyDto };

export class CreateUser {
  username: string;

  hobby: { id: string; name: string }[];
}
