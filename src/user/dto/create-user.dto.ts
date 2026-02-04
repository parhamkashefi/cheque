import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'parham',
    required: true,
    description: 'admin names',
  })
  @IsString()
  @IsNotEmpty()
  admin: string;

  @ApiProperty({
    example: '09123456789',
    required: true,
    description: 'phone number',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: String;

}
