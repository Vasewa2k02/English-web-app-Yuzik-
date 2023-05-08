import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponse } from './response/task.response';

@Injectable()
export class TaskRepository {
  constructor(private readonly db: DatabaseService) {}

  private selectForLesson = {
    id: true,
    englishSentence: true,
    russianSentence: true,
  };

  public async getTaskById(id: number): Promise<TaskResponse> {
    return await this.db.task.findUnique({
      where: { id },
      select: this.selectForLesson,
    });
  }

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

  public async removeTask(id: number): Promise<void> {
    await this.db.task.delete({
      where: {
        id,
      },
    });
  }
}
