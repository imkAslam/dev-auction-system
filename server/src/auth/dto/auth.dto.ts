import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'user email',
    example: 'abc@user.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty({
    description: 'password',
    example: '*****',
  })
  @IsNotEmpty({ message: 'password can not be empty' })
  @IsString()
  password: string;
}
