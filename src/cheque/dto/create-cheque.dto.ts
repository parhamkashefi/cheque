import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateChequeDto {
  @ApiProperty({
    example: 'ali',
    required: true,
    description: 'customer name',
  })
  @IsString()
  @IsNotEmpty()
  customer: string;

  @ApiProperty({
    example: "123456789", 
    required: true,
    description: 'cheque serial number',
  })
  @IsString()
  @IsNotEmpty()
  serial: string; 

  @ApiProperty({
    required: true,
    example: '1404/08/29',
    description: 'the date one the cheque must be paid',
  })
  @IsString()
  @IsNotEmpty()
  dueDate: string;

  @ApiProperty({
    example: '10000000',
    required: true,
    description: 'amount of cheque',
  })
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty({
    example: false,
    required: true,
    default: false,
    description: 'this show the cheque is paid or not',
  })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @ApiProperty({
    example: [],
    description: 'cheque payment dates',
    required: false,
    default: false,
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true }) 
  dateHistory: [string];
}
