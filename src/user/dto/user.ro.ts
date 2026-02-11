import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class UserRo {
  @ApiProperty({
    example: 'ali',
    description: 'customer name',
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: '09123456789',
    description: 'phone number',
  })
  @Expose()
  phoneNumber: String;

  @ApiProperty({ example: '676e342a2b2f4b8e1d9b09ef' })
  @Expose({ name: '_id' })
  @Type(() => String)
  id: string;}
