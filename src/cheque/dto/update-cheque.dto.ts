import { PartialType } from '@nestjs/swagger';
import { CreateChequeDto } from './create-cheque.dto';

export class UpdateChequeDto extends PartialType(CreateChequeDto) {}
