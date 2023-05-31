import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/local-auth.guard';

@Controller('auction')
@ApiTags('Auction Items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post('/create-item')
  @ApiOperation({ summary: 'create auction item' })
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
          itemName: 'name of item',
          description: 'This is the item description',
          startPrice: 20,
          currentPrice: 200,
          dueDate: '2016-06-22 19:10:25-07',
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
  create(@Body() body: CreateAuctionDto, @Request() req) {
    return this.auctionService.create(req, body);
  }

  @Get('/items')
  @ApiOperation({ summary: 'get all auction items' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      default: [
        {
          id: 1,
          itemName: 'name of auctioned item',
          description: 'This is the auctioned item description',
          startPrice: '200.00',
          currentPrice: '400.00',
          dueDate: '2016-06-23T02:10:25.000Z',
          createdAt: '2023-05-21T09:38:54.877Z',
          updatedAt: '2023-05-21T09:38:54.877Z',
        },
      ],
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
  findAll() {
    return this.auctionService.findAll();
  }

  @Get(':id/item')
  @ApiOperation({ summary: 'get auction item by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      default: {
        id: 1,
        itemName: 'name of auctioned item',
        description: 'This is the auctioned item description',
        startPrice: '200.00',
        currentPrice: '400.00',
        dueDate: '2016-06-23T02:10:25.000Z',
        createdAt: '2023-05-21T09:38:54.877Z',
        updatedAt: '2023-05-21T09:38:54.877Z',
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
  findOne(@Param('id') id: string) {
    return this.auctionService.findOne(+id);
  }

  @Patch(':id/item')
  @ApiOperation({ summary: 'update auction item by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      default: {
        id: 1,
        itemName: 'name of auctioned item',
        description: 'This is the auctioned item description',
        startPrice: '200.00',
        currentPrice: '400.00',
        dueDate: '2016-06-23T02:10:25.000Z',
        createdAt: '2023-05-21T09:38:54.877Z',
        updatedAt: '2023-05-21T09:38:54.877Z',
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
  update(@Param('id') id: string, @Body() updateAuctionDto: UpdateAuctionDto) {
    return this.auctionService.update(+id, updateAuctionDto);
  }

  @Delete(':id/item')
  @ApiOperation({ summary: 'delete auction item by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      default: {
        succeeded: true,
        statusCode: 200,
        message: 'Record Deleted Successfully',
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
  remove(@Param('id') id: string) {
    return this.auctionService.remove(+id);
  }
}
