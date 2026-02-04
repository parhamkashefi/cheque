import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsString,
  IsNumber,
  IsNotEmpty,
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
    example: '123456789',
    required: true,
    description: 'cheque serial number',
  })
  @IsNumber()
  @IsNotEmpty()
  serial: Number;

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
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: false,
    required: true,
    default: false,
    description: 'this show the cheqaue is paide or not ',
  })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @ApiProperty({
    example: [String],
    description: 'cheque payment dates',
  })
  @IsArray()
  dateHistory: [string];
}
