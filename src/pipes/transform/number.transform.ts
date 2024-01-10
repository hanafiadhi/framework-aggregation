import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class NumberTransformPipe implements PipeTransform {
  transform(value: number) {
    if (isNaN(value)) {
       throw new BadRequestException("Invalid number types");
    }
    
    return Number(value);
  }
}
