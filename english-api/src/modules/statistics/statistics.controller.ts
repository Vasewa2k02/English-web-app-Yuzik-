import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { StatisticsResponse } from './response/statistics.response';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  private create(
    @Req() req: RequestWithUser,
    @Body() createStatisticDto: CreateStatisticDto,
  ) {
    return this.statisticsService.createOrUpdateStatistics(
      +req.user.id,
      createStatisticDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('all')
  private getAllStatistics(): Promise<StatisticsResponse[]> {
    return this.statisticsService.getAllStatistics();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user-all')
  private getUserAllStatistics(
    @Req() req: RequestWithUser,
  ): Promise<StatisticsResponse> {
    return this.statisticsService.getUserAllStatistics(+req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user-today')
  private getUserTodayStatistics(
    @Req() req: RequestWithUser,
  ): Promise<StatisticsResponse> {
    return this.statisticsService.getUserTodayStatistics(+req.user.id);
  }
}
