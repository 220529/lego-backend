import { PartialType } from '@nestjs/swagger';
import { CreateWorkDto } from './create-Work.dto';

export class UpdateWorkDto extends PartialType(CreateWorkDto) {}
