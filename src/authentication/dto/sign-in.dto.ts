import { IsAlphanumeric, IsNotEmpty } from "class-validator";

export class SignInDto {
    @IsAlphanumeric()
    username: string;
    @IsNotEmpty()
    password: string;
}