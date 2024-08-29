import {
  Controller,
  Get,
  Delete,
  Post,
  Param,
  Patch,
  Body,
  Version,
  Res,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserResSuccesCreate } from '../common/swagger/api/respone/user.respone';
import {
  ErrorBadRequestExecption,
  ErrorNotFoundExeption,
} from '../common/swagger/api/respone/response.error';
import { Response } from 'express';
import {
  DeletingData,
  Pagination,
} from '../common/swagger/api/respone/response.success';
import { RoleGuard } from '../guard/role.guard';
import { Role } from '../decorator/roles.decorator';
import { Roles } from '../common/enum/role.enum';
import { AccessTokenGuard } from '../guard/acccess-token.guard';
import { MongoIdValidationPipe } from '../pipes/validator/mongoid.validator';
import { ResendOrVerif } from './dto/resend-or-verifikasi.dto';
import { ActiveUser } from '../decorator/active-user.decorator';

@ApiBearerAuth('jwt')
@UseGuards(AccessTokenGuard)
// @Role(Roles.ROOT,Ro÷)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @ApiOperation({ summary: 'membuat user' })
  @ApiCreatedResponse({ type: UserResSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @Post()
  createv2(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Version('1')
  @ApiOperation({
    summary: 'Pencarian user secara handal',
    description: `Dalam api ini bisa:\n
        1. Mencari data field\n
        2. Menampilkan beberapa field (data yang dibutuhkan, Multiple) ex:username\n
        3. Sorting (ASC/DESC ,Multiple field) ex:-created_at\n
        4. Pagination \n`,
    externalDocs: {
      url: 'http://localhost:3001/user?username[regex]=hanafi&page=1&limit=10&fields=username,role&sort=-username',
      description: `
        Ex: pencarian handal. \n
        1. filds[regex]=value -> mencari string di suatu field yang mengandung kata dari value(case in sensitive) ex:username[regex]=hanafi\n
        2. filds[in]=value -> mencari sebuah string dalam filed yang bertipe array string\n
        3. filds[eq]=value -> mencari sebuah kata yang sama dengan value pada fild yang di cari(case Sensitive)\n
        4. fileds[ne]=value -> mencari data yang tidak sama dengan value pada sebuah field\n
        5. fields[or]=value -> mengkombine beberapa filed untuk mencari data tertentu
      `,
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'fields', required: false, type: String })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiOkResponse({ type: Pagination })
  findAll(@Query() query: any) {
    return this.userService.findAll(query);
  }

  @Version('1')
  @ApiOperation({ summary: 'mendapatkan satu user' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id yang di gunakan untuk paramester harus mongo id',
  })
  @ApiOkResponse({ type: UserResSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @Get('/:id')
  findOne(@Param('id', MongoIdValidationPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Version('1')
  @Patch('/:id')
  @ApiOperation({ summary: 'update satu user' })
  @ApiOkResponse({ type: UserResSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id yang di gunakan untuk paramester harus mongo id',
  })
  update(
    @Param('id', MongoIdValidationPipe) userId: string,
    @Payload() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Version('1')
  @ApiOperation({ summary: 'menghapus satu user' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id yang di gunakan untuk paramester harus mongo id',
  })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiOkResponse({ type: DeletingData })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @Delete(':id')
  async remove(
    @Res() response: Response,
    @Param('id', MongoIdValidationPipe) id: string,
  ) {
    await this.userService.remove(id);
    return response.status(200).json({
      message: 'Berhasil menghapus data',
      statuCode: 200,
    });
  }

  @Version('1')
  @ApiOperation({ summary: 'Generate OTP for changing WhatsApp number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'OTP generated successfully or WhatsApp number updated successfully',
    schema: {
      example: {
        statusCode: HttpStatus.OK,
        message:
          'berhasil generate code otp' ||
          'Silahkan login dengan nomor whatsapp terbaru',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Nomor WhatsApp masih sama with the current one',
    schema: {
      example: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'nomor whatsapp masih sama',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'OTP is either banned, expired, or incorrect',
    schema: {
      example: {
        statusCode: HttpStatus.NOT_ACCEPTABLE,
        message: 'kode otp sudah expired' || 'kode otp salah',
        date_banned: 1672545600000,
        banned: 'Silahkan coba lagi',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'WhatsApp number already in use, prompt user to check messages',
    schema: {
      example: {
        statusCode: HttpStatus.OK,
        message: 'jika whatsapp aktif, Silahkan cek Pesan',
      },
    },
  })
  @Patch('/change-whatsapp')
  async sendTokenOtp(
    @Res() response: Response,
    @Body() { whatsapp, otp }: ResendOrVerif,
    @ActiveUser() { sub }: any,
  ) {
    try {
      const responses = await this.userService.resendAndChangeWhatsapp(
        sub,
        whatsapp,
        otp,
      );
      response.status(responses['statusCode']).json(responses).end();
    } catch (error) {
      response.status(error.statusCode).json(error).end();
    }
  }
}
