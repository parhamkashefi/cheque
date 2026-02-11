import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cheque } from './schema/cheque.schema';
import { ChequeDocument } from './schema/cheque.schema';
import { ChequeRo } from './dto/cheque.ro';
import { CreateChequeDto } from './dto/create-cheque.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateChequeDto } from './dto/update-cheque.dto';
import { UpdateDateChequeDto } from './dto/update-date-cheque.dto';

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
    return docs.map((d) =>
      plainToInstance(ChequeRo, d, {
        excludeExtraneousValues: true,
      }),
    );
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
    updateChequeDto: UpdateChequeDto,
  ): Promise<ChequeRo> {
    try {
      const cheque = await this.chequeModel.findOneAndUpdate(
        { _id: id },
        { $set: updateChequeDto },
        { new: true },
      );

      if (!cheque) {
        throw new NotFoundException('کاربری یافت نشد!');
      }

      return plainToInstance(ChequeRo, cheque, {
        excludeExtraneousValues: true,
      });
    } catch (error: any) {
      if (error?.name === 'MongoServerError' && error?.code === 11000) {
        throw new UnprocessableEntityException({
          message: `این ${Object.keys(error.keyValue)[0]} هم اکنون وجود دارد!`,
        });
      }

      throw new BadRequestException(
        'هنگام به روزرسانی کاربر خطایی روی داده است!',
      );
    }
  }

  async updateDateChequeById(
    id: string,
    updateDateChequeDto: UpdateDateChequeDto,
  ): Promise<ChequeRo> {
    try {
      const currentCheque = await this.chequeModel.findById(id);

      if (!currentCheque) {
        throw new NotFoundException('چکی یافت نشد!');
      }

      if (currentCheque.dueDate === updateDateChequeDto.dueDate) {
        return plainToInstance(ChequeRo, currentCheque, {
          excludeExtraneousValues: true,
        });
      }

      const updatedCheque = await this.chequeModel.findByIdAndUpdate(
        id,
        {
          $set: {
            dueDate: updateDateChequeDto.dueDate,
          },
          $push: {
            dateHistory: currentCheque.dueDate,
          },
        },
        { new: true },
      );

      return plainToInstance(ChequeRo, updatedCheque, {
        excludeExtraneousValues: true,
      });
    } catch (error: any) {
      throw new BadRequestException('خطا در بروزرسانی تاریخ چک');
    }
  }

  async deleteChequeById(id: string): Promise<void> {
    const result = await this.chequeModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Cheque not found');
    }
  }
}
