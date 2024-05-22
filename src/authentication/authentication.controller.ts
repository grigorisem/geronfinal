import { CreateUserDto } from './../user/dto/create-user.dto';
import { Controller, Post, Body} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/constants';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Public()
  @Post('login')
  signIn(@Body() createAuthenticationDto: SignInDto) {
    return this.authenticationService.signIn(createAuthenticationDto);
  }
  @Public()
  @Post('signup')
  signUp(@Body() CreateUserDto: CreateUserDto) {
    return this.authenticationService.signUp(CreateUserDto)
  }
}