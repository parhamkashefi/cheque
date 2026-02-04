import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { ChequeRo } from './dto/cheque.ro';
import { CreateChequeDto } from './dto/create-cheque.dto';
import { ChequeService } from './cheque.service';

@ApiTags('Cheque')
@Controller('cheque')
export class ChequeController {
  constructor(private readonly chequeService: ChequeService) {}

  @Post()
  @ApiOperation({ summary: `Create cheque` })
  @ApiCreatedResponse({ type: ChequeRo })
  async create(@Body() createChequeDto: CreateChequeDto): Promise<ChequeRo> {
    return this.chequeService.createCheque(createChequeDto);
  }

  @Get()
  @ApiOperation({ summary: `Get all cheques` })
  @ApiCreatedResponse({ type: [ChequeRo] })
  async getAll(): Promise<ChequeRo[]> {
    return this.chequeService.getAllCheques();
  }

  @Get(':id')
  @ApiOperation({ summary: `Get cheque by ID` })
  @ApiParam({ name: 'id', type: 'string', description: 'Cheque ID' })
  @ApiCreatedResponse({ type: ChequeRo })
  async getById(@Param('id') id: string): Promise<ChequeRo> {
    return this.chequeService.getChequeById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: `Update cheque by ID` })
  @ApiParam({ name: 'id', type: 'string', description: 'Cheque ID' })
  @ApiCreatedResponse({ type: ChequeRo })
  async updateById(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateChequeDto>,
  ): Promise<ChequeRo> {
    return this.chequeService.updateChequeById(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete cheque by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Delete the cheque by ID',
  })
  async deleteChequeById(@Param('id') id: string): Promise<void> {
    return this.chequeService.deleteChequeById(id);
  }
}
