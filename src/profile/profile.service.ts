import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenData } from 'src/authentication/types/AuthRequest';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './models/profile.model';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(User)
        private readonly userReoository: Repository<User>
    ){}

    async getProfile(tokenData: TokenData) {
        const user = await this.userReoository.findOne({
            where: {
                id: tokenData.id,
            },
        });
        
        return new Profile(user);
    }
}