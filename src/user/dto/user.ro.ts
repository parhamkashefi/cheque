import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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

  @ApiProperty({ required: false })
  _id?: string;
}
