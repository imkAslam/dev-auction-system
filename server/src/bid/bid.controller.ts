import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { BidService } from './bid.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/local-auth.guard';

@ApiTags('Bidding')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post('/auction')
  @ApiOperation({ summary: 'bid against per auction' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: {
      type: 'object',
      default: {
        succeeded: true,
        statusCode: HttpStatus.CREATED,
        message: 'Operation successful',
        data: {
          id: 1,
          auctionId: 1,
          bidAmount: 200,
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
  create(@Request() req: object, @Body() body: CreateBidDto) {
    return this.bidService.create(req, body);
  }

  @Get('/auction')
  @ApiOperation({ summary: 'get user all bids against auctions' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      type: 'object',
      default: {
        succeeded: true,
        statusCode: HttpStatus.OK,
        message: 'Operation successful',
        data: [
          {
            id: 1,
            auctionId: 1,
            bidAmount: 200,
            createdAt: '2023-05-20T16:34:26.873Z',
            updatedAt: '2023-05-20T16:34:26.873Z',
          },
        ],
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
  findAll(@Request() req: object) {
    return this.bidService.findAll(req);
  }

  @Get(':id/auction')
  @ApiOperation({ summary: 'get bid by id' })
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
          auctionId: 1,
          bidAmount: 200,
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
  findOne(@Param('id') id: string, @Request() req: object) {
    return this.bidService.findOne(+id, req);
  }

  @Delete(':id/auction')
  @ApiOperation({ summary: 'delete bid by bidId' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      type: 'object',
      default: {
        succeeded: true,
        statusCode: HttpStatus.OK,
        message: 'Record deleted successful',
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
  remove(@Param('id') id: string, @Request() req: object) {
    return this.bidService.remove(+id, req);
  }
}
