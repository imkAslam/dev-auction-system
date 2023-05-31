import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/local-auth.guard';

@ApiTags('User Payment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Add user payment' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: {
      type: 'object',
      default: {
        succeeded: true,
        message: 'Payment added successfully',
        statusCode: HttpStatus.OK,
        data: [],
        meta: null,
      },
    },
  })
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
    status: HttpStatus.NOT_FOUND,
    schema: {
      type: 'object',
      default: {
        succeeded: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Record not found',
      },
    },
    description: 'not found response',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    schema: {
      type: 'object',
      default: {
        succeeded: false,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'unauthorized',
      },
    },
    description: 'unauthorized response',
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
  addPayment(@Request() req: object, @Body() body: CreatePaymentDto) {
    return this.paymentService.create(req, body);
  }

  @Get()
  @ApiOperation({ summary: 'get user payment' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      type: 'object',
      default: {
        succeeded: true,
        statusCode: HttpStatus.OK,
        message: 'Operation successful',
        data: {
          id: 1,
          amount: 200,
          createdAt: '2023-05-20T16:34:26.873Z',
          updatedAt: '2023-05-20T16:34:26.873Z',
        },
        meta: null,
      },
    },
  })
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
    status: HttpStatus.NOT_FOUND,
    schema: {
      type: 'object',
      default: {
        succeeded: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Record not found',
      },
    },
    description: 'not found response',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    schema: {
      type: 'object',
      default: {
        succeeded: false,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'unauthorized',
      },
    },
    description: 'unauthorized response',
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
  viewPayment(@Request() req: object) {
    return this.paymentService.getPayment(req);
  }
}
