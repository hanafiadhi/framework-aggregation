import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

const objectId = /^[0-9a-fA-F]{24}$/;

@JoiSchemaOptions({
  abortEarly: false,
  allowUnknown: false,
})
export class RegionValidator {
  @JoiSchema(
    Joi.string().regex(objectId).when('city', {
      is: Joi.exist(),
      then: Joi.required(),
    }),
  )
  readonly province: string;

  @JoiSchema(
    Joi.string().regex(objectId).when('district', {
      is: Joi.exist(),
      then: Joi.required(),
    }),
  )
  readonly city: string;

  @JoiSchema(
    Joi.string().regex(objectId).when('sub_district', {
      is: Joi.exist(),
      then: Joi.required(),
    }),
  )
  readonly district: string;

  @JoiSchema(Joi.string().regex(objectId))
  readonly sub_district: string;
}
