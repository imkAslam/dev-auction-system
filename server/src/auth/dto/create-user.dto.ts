import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user',
  })
  @IsString()
  @IsNotEmpty({ message: 'username is required' })
  userName: string;

  @ApiProperty({
    example: 'abc@user.com',
  })
  @IsEmail({}, { message: 'email must be a valid email' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty({
    example: '*****',
  })
  @IsNotEmpty({ message: 'password can not be empty' })
  @IsString()
  password: string;
}
