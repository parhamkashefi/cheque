import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class UpdateDateChequeDto {
  @ApiProperty({
    required: true,
    example: '1404/08/29',
    description: 'the date one the cheque must be paid',
  })
  @IsString()
  @IsNotEmpty()
  dueDate: string;

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