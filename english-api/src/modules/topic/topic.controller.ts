import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { swaggerType } from 'src/helpers/swagger/utils';
import { TaskResponse } from '../task/response/task.response';
import { TopicResponse } from './response/topic.response';

@ApiTags('topic')
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  private create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse(swaggerType(TopicResponse))
  @UseGuards(JwtAuthGuard)
  @Get()
  private findAll() {
    return this.topicService.findAll();
  }

  @Get(':id')
  private findOne(@Param('id') id: string) {
    return this.topicService.findOne(+id);
  }

  @Delete(':id')
  private remove(@Param('id') id: string) {
    return this.topicService.remove(+id);
  }

  @Patch(':id')
  private update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicService.update(+id, updateTopicDto);
  }
}
