import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ChequeRo } from './dto/cheque.ro';
import { CreateChequeDto } from './dto/create-cheque.dto';
import { ChequeService } from './cheque.service';
import { UpdateChequeDto } from './dto/update-cheque.dto';
import { UpdateDateChequeDto } from './dto/update-date-cheque.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Cheque')
@Controller('cheque')
export class ChequeController {
  constructor(private readonly chequeService: ChequeService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: `Create cheque` })
  @ApiCreatedResponse({ type: ChequeRo })
  async create(@Body() createChequeDto: CreateChequeDto): Promise<ChequeRo> {
    return this.chequeService.createCheque(createChequeDto);
  }

  @Get('find')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: `Get all cheques` })
  @ApiCreatedResponse({ type: [ChequeRo] })
  async getAll(): Promise<ChequeRo[]> {
    return this.chequeService.getAllCheques();
  }

  @Get('find/byId/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: `Get cheque by ID` })
  @ApiParam({ name: 'id', type: 'string', description: 'Cheque ID' })
  @ApiCreatedResponse({ type: ChequeRo })
  async getById(@Param('id') id: string): Promise<ChequeRo> {
    return this.chequeService.getChequeById(id);
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update cheque by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateChequeDto })
  @ApiOkResponse({ type: ChequeRo })
  async updateById(
    @Param('id') id: string,
    @Body() updateChequeDto: UpdateChequeDto,
  ): Promise<ChequeRo> {
    return this.chequeService.updateChequeById(id, updateChequeDto);
  }

  @Patch('update/date/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update Date cheque by ID and push old date to date history',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateDateChequeDto })
  @ApiOkResponse({ type: ChequeRo })
  async updateDateById(
    @Param('id') id: string,
    @Body() updateDateChequeDto: UpdateDateChequeDto,
  ): Promise<ChequeRo> {
    return this.chequeService.updateDateChequeById(id, updateDateChequeDto);
  }

  @Delete('delete:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
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
