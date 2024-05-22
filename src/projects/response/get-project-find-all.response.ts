import { ApiProperty } from "@nestjs/swagger";

export class GetProjectFindAllResponse {
    @ApiProperty({ example: '5debdb62-85b1-4433-8721-5f0117172427f'})
    id: string;

    @ApiProperty({ example: 'Название проекта'})
    name: string;  
}