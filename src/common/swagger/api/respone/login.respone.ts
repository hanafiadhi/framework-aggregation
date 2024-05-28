import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../../../../user/dto/create-user.dto';

export class UserResSuccesCreate extends PartialType(CreateUserDto) {}
