import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Project } from "../entities/project.entity";
import { TaskStatus } from "../entities/task.entity";

export class GetTasksResponse {
    @ApiProperty({ example: 'Сделать дизайн'} )
    title: string;

    @ApiProperty({ example: '2024-05-20T00:00:00+06:00'} )
    startDate: string;

    @ApiProperty({ example: '2024-05-20T00:00:00+06:00'} )
    endDate: string;

    @ApiProperty({
        example: {
            username: 'testusername',
            firstName: 'Geron',
            lastName: 'Geronov',
        },
    })
    user: Pick<User, 'username' | 'firstName' | 'lastName'>;

    @ApiProperty({
        example: {
            id: '5debdb62-85b1-4433-8721-5f017172427f',
            name: 'Название проекта',
        },
    })
    project: Project;

    @ApiProperty({ enum: TaskStatus} )
    status: TaskStatus;
}