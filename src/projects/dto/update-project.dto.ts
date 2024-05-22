import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(0)
    users: string[];

    @IsOptional()
    @IsOptional()
    name?: string;
}
