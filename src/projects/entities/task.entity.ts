import { AbstractEntity } from "src/abstraction/abstract.entity";
import { Project } from "./project.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

export enum TaskStatus {
    create = 'create',
    inProgress = 'inProgress',
    done = 'done',
}

@Entity()
export class Task extends AbstractEntity<Task> {
    @Column()
    title : string

    @Column()
    startDate : string

    @Column()
    endDate : string
    @Column()
    status: TaskStatus

    @ManyToOne (()=> User)
    user:User;

    @ManyToOne (()=> Project)
    project:Project;
}