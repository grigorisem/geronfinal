import { Repository, EntityManager } from 'typeorm';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenData } from './types/AuthRequest';
@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ){}
  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: signInDto.username,
      },
    });
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    if(!isMatch) {
      throw new HttpException("Некорректный пароль", HttpStatus.UNAUTHORIZED)
    }
    const payLoad: TokenData = { id: user.id};
    const token = await this.jwtService.signAsync(payLoad);
    return JSON.stringify(token)
  }
  async signUp(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.count({
      where: {
        username: createUserDto.username,
      }
    });

    if (userExist) {
      throw new HttpException(
        'Пользователь с таким именем уже существует',
        HttpStatus.CONFLICT,
      );
    }
    
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const user = new User({ ...createUserDto, password: hash });
    await this.userRepository.save(user);
    return JSON.stringify('Польователь успешно зарегистрирован');
  }
}