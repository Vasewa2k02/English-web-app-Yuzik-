import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponse } from './response/task.response';

@Injectable()
export class TaskRepository {
  private selectForLesson = {
    id: true,
    englishSentence: true,
    russianSentence: true,
  };

  constructor(private readonly db: DatabaseService) {}

  public async createTask(createTaskDto: CreateTaskDto): Promise<TaskResponse> {
    const { lessonId, ...dto } = createTaskDto;
    return await this.db.task.create({
      data: {
        ...dto,
        lesson: {
          connect: {
            id: lessonId,
          },
        },
      },
      select: this.selectForLesson,
    });
  }

  public async getTaskById(id: number): Promise<TaskResponse> {
    return await this.db.task.findUnique({
      where: { id },
      select: this.selectForLesson,
    });
  }

  public async getUniqueTask(
    createTaskDto: CreateTaskDto,
  ): Promise<TaskResponse> {
    return await this.db.task.findUnique({
      where: {
        englishSentence_russianSentence_lessonId: {
          ...createTaskDto,
        },
      },
      select: this.selectForLesson,
    });
  }

  public async removeTask(id: number): Promise<void> {
    await this.db.task.delete({
      where: {
        id,
      },
    });
  }

  public async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponse> {
    return await this.db.task.update({
      where: {
        id,
      },
      data: {
        ...updateTaskDto,
      },
      select: this.selectForLesson,
    });
  }
}
