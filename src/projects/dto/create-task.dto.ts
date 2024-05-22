import { IsAlpha, IsDateString, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsOptional()
    @IsAlpha()
    username?: string;

    @IsString()
    projectId: string;
}