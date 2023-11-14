import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicResponse } from './response/topic.response';
import { CreateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class TopicRepository {
  constructor(private readonly db: DatabaseService) {}

  private fullSelect = {
    id: true,
    name: true,
    lessons: {
      select: {
        id: true,
        name: true,
        theory: true,
        topicId: true,
        tasks: {
          select: {
            id: true,
            englishSentence: true,
            russianSentence: true,
          },
        },
      },
    },
  };

  public async getTopicById(id: number): Promise<TopicResponse> {
    return await this.db.topic.findUnique({
      where: { id },
      select: this.fullSelect,
    });
  }

  public async getTopicByName(name: string): Promise<TopicResponse> {
    return await this.db.topic.findFirst({
      where: { name },
      select: this.fullSelect,
    });
  }

  public async getAllTopics(): Promise<TopicResponse[]> {
    return await this.db.topic.findMany({
      select: this.fullSelect,
    });
  }

  public async createTopic(createTopicDto: CreateTopicDto): Promise<void> {
    await this.db.topic.create({
      data: { ...createTopicDto },
    });
  }

  public async updateTopic(
    id: number,
    updateTopicDto: UpdateTopicDto,
  ): Promise<void> {
    await this.db.topic.update({
      where: {
        id,
      },
      data: {
        ...updateTopicDto,
      },
    });
  }

  public async removeTopic(id: number): Promise<void> {
    await this.db.topic.delete({
      where: {
        id,
      },
    });
  }
}
