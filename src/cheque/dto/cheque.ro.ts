import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ChequeRo {
  @ApiProperty({
    example: 'ali',
    description: 'customer name',
  })
  @Expose()
  customer: string;

  @ApiProperty({
    example: '123456789',
    description: 'cheque serial number',
  })
  @Expose()
  serial: Number;

  @ApiProperty({
    example: '1404/01/01',
    description: 'the date one the cheque must be paid',
  })
  @Expose()
  dueDate: string;

  @ApiProperty({
    example: '10000000',
    description: 'amount of cheque',
  })
  @Expose()
  amount: number;

  @ApiProperty({
    example: 'False',
    description: 'this show the cheqaue is paide or not ',
  })
  @Expose()
  status: boolean;

  @ApiProperty({
    example: [],
    description: 'cheque payment dates',
  })
  @Expose()
  dateHistory: string[];

  @ApiProperty({ example: '676e342a2b2f4b8e1d9b09ef' })
  @Expose({ name: '_id' })
  @Type(() => String)
  id: string;
}
