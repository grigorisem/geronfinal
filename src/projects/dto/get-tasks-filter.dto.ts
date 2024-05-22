import { IsAlpha, IsOptional, IsString } from "class-validator";

export class GetTasksFilterDto {
    @IsOptional()
    @IsAlpha()
    userтname?: string;

    @IsOptional()
    @IsString()
    projectId?: string;
}