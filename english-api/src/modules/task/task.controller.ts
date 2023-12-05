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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { TaskResponse } from './response/task.response';
import { swaggerType } from 'src/helpers/swagger/utils';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth()
  @ApiOkResponse(swaggerType(TaskResponse))
  @UseGuards(JwtAuthGuard)
  @Post()
  private createLesson(@Body() сreateTaskDto: CreateTaskDto): Promise<TaskResponse> {
    return this.taskService.createTask(сreateTaskDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public remove(@Param('id') id: string): Promise<void> {
    return this.taskService.removeTask(+id);
  }

  @ApiBearerAuth()
  @ApiOkResponse(swaggerType(TaskResponse))
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public updateLesson(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponse> {
    return this.taskService.updateTask(+id, updateTaskDto);
  }
}
