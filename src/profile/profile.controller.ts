import { Controller, Get, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequest } from 'src/authentication/types/AuthRequest';
import { GetMyProfileResponse } from './response/get-my-profile-response';
@ApiTags('Профиль')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  
  @ApiResponse({ type: GetMyProfileResponse })
  @Get()
  getProfile(@Request() req: AuthRequest) {
    return req.user;
  }
}