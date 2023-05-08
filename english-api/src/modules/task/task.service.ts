import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponse } from './response/task.response';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskResponse> {
    return await this.taskRepository.createTask(createTaskDto);
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponse> {
    await this.checkTaskExistence(id);
    return await this.taskRepository.updateTask(id, updateTaskDto);
  }

  async removeTask(id: number): Promise<void> {
    await this.checkTaskExistence(id);
    await this.taskRepository.removeTask(id);
  }

  private async checkTaskExistence(id: number): Promise<void> {
    const task = await this.taskRepository.getTaskById(id);

    if (!task) {
      throw new NotFoundException('This task doesn`t exist');
    }
  }
}
