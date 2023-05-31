import {
  Controller,
  Post,
  Request,
  UseGuards,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '@/auth/dto/create-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    schema: {
      type: 'object',
      default: {
        succeeded: false,
        statusCode: 400,
        message: 'Bad request',
      },
    },
    description: 'bad request response',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    schema: {
      type: 'object',
      default: {
        succeeded: false,
        statusCode: 409,
        message: 'invalid email/password',
      },
    },
    description: 'Invalid email or password',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    schema: {
      type: 'object',
      default: {
        succeeded: false,
        statusCode: 404,
        message: "Record not found /user doesn't exist",
      },
    },
    description: 'not found response',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      type: 'object',
      default: {
        succeeded: true,
        statusCode: 200,
        message: 'Operation successful',
        data: {
          id: 1,
          userName: 'user',
          email: 'abc@user.com',
          createdAt: '2023-05-20T16:34:26.873Z',
          updatedAt: '2023-05-20T16:34:26.873Z',
          access_token: 'eyJhbGciOiJIUzI1NiIsIn',
        },
        meta: null,
      },
    },
    description: 'login successful',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    schema: {
      type: 'object',
      default: {
        succeeded: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'internal server error ',
      },
    },
    description: 'internal server error',
  })
  @HttpCode(200)
  @Post('login')
  async login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }
  @ApiOperation({ summary: 'create user' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    schema: {
      type: 'object',
      default: {
        succeeded: false,
        statusCode: 400,
        message: 'Bad request',
      },
    },
    description: 'bad request response',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    schema: {
      type: 'object',
      default: {
        succeeded: false,
        statusCode: 409,
        message: 'email/user already exists',
      },
    },
    description: 'already exists',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: {
      type: 'object',
      default: {
        succeeded: true,
        statusCode: 201,
        message: 'Operation successful',
        data: {
          id: 1,
          userName: 'user',
          email: 'abc@user.com',
          createdAt: '2023-05-20T16:34:26.873Z',
          updatedAt: '2023-05-20T16:34:26.873Z',
          access_token: 'eyJhbGciOiJIUzI1NiIsIn',
        },
        meta: null,
      },
    },
    description: 'user created successful',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    schema: {
      type: 'object',
      default: {
        succeeded: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'internal server error',
      },
    },
    description: 'internal server error',
  })
  @Post('register')
  create(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }
}
