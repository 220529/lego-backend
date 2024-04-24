import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { nanoid } from 'nanoid';
import { Model } from 'mongoose';
import { Work, WorkDocument } from './schemas/work.schema';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { User } from '@/user/schemas/user.schema';

@Injectable()
export class WorkService {
  constructor(
    @InjectModel(Work.name) private readonly workModel: Model<WorkDocument>,
  ) {}

  async findAll(
    pageNo: number,
    pageSize: number,
    title: string,
    sortBy: string,
    sortOrder: 'asc' | 'desc',
  ): Promise<{
    list: Work[];
    total: number;
    pageNo: number;
    pageSize: number;
  }> {
    const skip = (pageNo - 1) * pageSize;
    const query = this.workModel.find();
    if (title) {
      query.find({ title: { $regex: title, $options: 'i' } });
    }
    if (sortBy && sortOrder) {
      query.sort({ [sortBy]: sortOrder });
    }
    const works = await query.skip(skip).limit(pageSize).exec();
    const total = await this.workModel.countDocuments();
    return { list: works, total, pageNo, pageSize };
  }

  async findOne(id: string): Promise<Work> {
    return this.workModel.findById(id).select({ __v: 0 }).exec();
  }

  async remove(id: string): Promise<Work> {
    return this.workModel.findByIdAndDelete(id).select({ _id: 1 }).exec();
  }

  async update(id: string, updateWorkDto: UpdateWorkDto): Promise<Work> {
    return this.workModel
      .findByIdAndUpdate(id, updateWorkDto, {
        new: true,
      })
      .select({ __v: 0 })
      .exec();
  }

  async create(createWorkDto: CreateWorkDto, user: User): Promise<Work> {
    const createdWork = new this.workModel({
      ...createWorkDto,
      uuid: nanoid(6),
      userId: user._id,
      author: user.username,
    });
    const work = await createdWork.save();
    return this.findOne(work._id);
  }

  async copyOne(id: string, user: User): Promise<Work> {
    const work = await this.workModel
      .findById(id)
      .select({ _id: 0, uuid: 0, createdAt: 0, updatedAt: 0, __v: 0 });
    work.title = `${work.title}-复制`;
    return this.create(work.toJSON(), user);
  }
}
