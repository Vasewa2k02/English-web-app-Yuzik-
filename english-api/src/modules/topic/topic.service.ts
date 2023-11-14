import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicRepository } from './topic.repository';

@Injectable()
export class TopicService {
  constructor(private readonly topicRepository: TopicRepository) {}

  async create(createTopicDto: CreateTopicDto) {
    const isTopicExists = await this.isTopicExists(createTopicDto.name);

    if (isTopicExists) {
      throw new BadRequestException('This topic already exists');
    }

    return this.topicRepository.createTopic(createTopicDto);
  }

  async findAll() {
    return this.topicRepository.getAllTopics();
  }

  findOne(id: number) {
    return `This action returns a #${id} topic`;
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }

  async isTopicExists(name: string) {
    const topic = await this.topicRepository.getTopicByName(name);

    return topic ? true : false;
  }
}
