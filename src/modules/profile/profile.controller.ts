import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GlobalRouteDecorator } from 'src/custom-decorators/global-route.docorator';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @GlobalRouteDecorator('createProfile')
  async create(@Payload() createProfileDto: CreateProfileDto) {
    return await this.profileService.create(createProfileDto);
  }

  @GlobalRouteDecorator('findAllProfile')
  async findAll() {
    return await this.profileService.findAll();
  }

  @GlobalRouteDecorator('findOneProfile')
  async findOne(@Payload() id: number) {
    return await this.profileService.findOne(id);
  }

  @GlobalRouteDecorator('updateProfile')
  async update(@Payload() updateProfileDto: UpdateProfileDto) {
    return await this.profileService.update(
      updateProfileDto.id,
      updateProfileDto,
    );
  }

  @GlobalRouteDecorator('removeProfile')
  async remove(@Payload() id: number) {
    return await this.profileService.remove(id);
  }
}
