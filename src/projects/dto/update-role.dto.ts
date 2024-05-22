import { IsAlpha, IsNotEmpty} from "class-validator";
import { RolesProject } from "../entities/role.entity";

export class UpdateRoleDto  {
    @IsNotEmpty()
    role: RolesProject;
    
    @IsAlpha()
    username: string;
}