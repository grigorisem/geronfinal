import { IsAlpha, IsOptional } from "class-validator";
import { RolesProject } from "../entities/role.entity";

export class AddedUserToProjectDTO {
    @IsAlpha()
    username: string;
    @IsOptional()
    role?: RolesProject;
}