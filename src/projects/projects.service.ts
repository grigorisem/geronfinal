import { TokenData } from './../authentication/types/AuthRequest';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository, FindOptionsWhere } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role, RolesProject } from './entities/role.entity';
import { GetParticipantsResponse } from './response/get-participants-response';
import { AddedUserToProjectDTO } from './dto/added-user-to-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role) 
    private readonly rolesProjectRepository: Repository<Role>,
  ){}
  async create(tokenData: TokenData, createProjectDto: CreateProjectDto) {
    const user = await this.userRepository.findOne({
      where: { id: tokenData.id}
    });

    const project = new Project(createProjectDto);

    await this.projectRepository.save(project);
    await this.rolesProjectRepository.save({
      user, 
      project,
      role: RolesProject.admin,
    });

    return JSON.stringify('Проект создан');
  }

  async findAll(tokenData: TokenData) {
    return this.projectRepository.find({
      where: {
         roles: { 
            user: {
              id: tokenData.id 
          },
    },
  },
});
  }

  async findParticipants(projectId: string) {
    const users = await this.userRepository.find({
      relations: {
        roles: {
          project: true,
        },
      },
    });

    const participants: GetParticipantsResponse[] = [];

    for (const user of users) {
      const projectIds = user.roles.map((item) => item.project.id);

      if(projectIds.includes(projectId)) continue;

      participants.push({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }

    return participants;
  }
  async findMembers(projectId: string) {
    return this.rolesProjectRepository.find({
      where: {
        project: {
          id: projectId,
        },
      },
      relations: {
        user: true,
      },
      select: {
        role: true,
        user: {
          firstName: true,
          username: true,
          lastName: true,
        },
      },
    });
  }

  async addedUserToProject(
    projectId: string,
    tokenData: TokenData,
    dto: AddedUserToProjectDTO,
  ) {
    const user = await this.rolesProjectRepository.findOne({
      where: {
        user: {
          id: tokenData.id,
        },
        project: {
          id: projectId,
        },
      },
    });

    if (user.role !== RolesProject.admin) {
      throw new HttpException(
        'У вас недостаточно прав, чтобы добавлять пользователй в проект',
        HttpStatus.CONFLICT,
      );
    }

    const member = await this.userRepository.findOne({
      where: {
        username: dto.username
      },
    });

    const project = await this.projectRepository.findOne({
      where: {
        id: projectId,
      },
    });

    await this.rolesProjectRepository.save({
      role: dto.role || RolesProject.worker,
      user: member,
      project: project,
    });

    return `Пользователь ${dto.username} добавлен`;
  }

  async update(projectId: string, updateProjectDto: UpdateProjectDto) {
    if(updateProjectDto.name) {
        await this.projectRepository.save({
            id: projectId,
            name: updateProjectDto.name,
        });
    }

    for(const userName of updateProjectDto.users) {
        const user = await this.userRepository.findOne({
            where: {
                username: userName,
            },
        });

        const checkUserCreated = await this.rolesProjectRepository.findOne({
          where: {
            user: {
              id: user.id,
            },
            project: {
              id: projectId,
            },
          },
        });

        if(checkUserCreated) continue;

        await this.rolesProjectRepository.save({
            user: { id: user.id },
            project: { id: projectId },
            role: RolesProject.worker,
        });
    }
  
    return JSON.stringify('Задача обновлена');
}
  async changeRole(projectId: string, updateRoleDto: UpdateRoleDto, tokenData: TokenData) {
    const isAdmin = await this.rolesProjectRepository.count({
      where:{
        role: RolesProject.admin,
        user:{
          id: tokenData.id
        },
        project: {
          id: projectId
        }
      }

    })
    if(!isAdmin) throw new HttpException("Функция доступна только админу.", HttpStatus.CONFLICT) 
    
    const role = await this.rolesProjectRepository.findOne({
      where: {
        user: {
          username: updateRoleDto.username
        },
        project: {
          id: projectId
        }
      }
    })
    await this.rolesProjectRepository.update(role.id, {
      role: updateRoleDto.role
    })
    return JSON.stringify("Роль пользователя ${updateRoleDto.username} обновлена")
  }
  
}
