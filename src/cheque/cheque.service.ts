import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cheque } from './schema/cheque.schema';
import { ChequeDocument } from './schema/cheque.schema';
import { ChequeRo } from './dto/cheque.ro';
import { CreateChequeDto } from './dto/create-cheque.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateChequeDto } from './dto/update-cheque.dto';

@Injectable()
export class ChequeService {
  constructor(
    @InjectModel(Cheque.name)
    private readonly chequeModel: Model<ChequeDocument>,
  ) {}

  async createCheque(createChequeDto: CreateChequeDto): Promise<ChequeRo> {
    try {
      const cheque = new this.chequeModel(createChequeDto);
      const savedCheque = await cheque.save();
      return plainToInstance(
        ChequeRo,
        savedCheque.toObject(),

        { excludeExtraneousValues: true },
      );
    } catch (err) {
      throw err;
    }
  }

  async getAllCheques(): Promise<ChequeRo[]> {
    const docs = await this.chequeModel.find();
    return docs.map((d) => plainToInstance(ChequeRo, d));
  }

  async getChequeById(id: string): Promise<ChequeRo> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid cheque id');
      }
      const cheque = await this.chequeModel.findById(id);
      if (!cheque) {
        throw new NotFoundException('Cheque not found');
      }

      return plainToInstance(ChequeRo, cheque, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      throw err;
    }
  }

  async getUnpaidCheques(): Promise<ChequeRo[]> {
    const cheques = await this.chequeModel.find({ isPaid: false });
    return cheques.map((cheque) =>
      plainToInstance(ChequeRo, cheque, { excludeExtraneousValues: true }),
    );
  }

  async updateChequeById(
    id: string,
    updateData: UpdateChequeDto,
  ): Promise<ChequeRo> {
    const cheque = await this.chequeModel.findById(id);

    if (!cheque) {
      throw new NotFoundException('Cheque not found');
    }

    if (updateData.dueDate && updateData.dueDate !== cheque.dueDate) {
      cheque.dateHistory = cheque.dateHistory || [];
      cheque.dateHistory.push(cheque.dueDate);
    }

    Object.assign(cheque, updateData);

    const saved = await cheque.save();

    return plainToInstance(ChequeRo, saved.toObject(), {
      excludeExtraneousValues: true,
    });
  }

  async deleteChequeById(id: string): Promise<void> {
    const result = await this.chequeModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Cheque not found');
    }
  }
}
