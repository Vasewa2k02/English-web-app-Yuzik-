import { ConfigService } from '@nestjs/config';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { WordForSocketResponse } from './modules/word/response/word-for-socket.response';
import { WordService } from './modules/word/word.service';

type currentWordType = {
  word: WordForSocketResponse;
  timeOut: number;
};

type leaderboardRecordType = {
  name: string;
  quizPoints: number;
};

@WebSocketGateway(5001, { transports: ['websocket'] })
export class AppGateway {
  constructor(
    private readonly wordService: WordService,
    private readonly configService: ConfigService,
  ) {
    setImmediate(async () => {
      setInterval(async () => {
        await this.generateWord();
        this.leaderboards.splice(0, this.leaderboards.length);

        this.server.emit('newRound', this.currentWord);
      }, +this.configService.get('CREATE_WORD_INTERVAL'));
    });
  }

  @WebSocketServer()
  server: Server;
  currentWord: currentWordType;
  leaderboards: leaderboardRecordType[] = [];

  @SubscribeMessage('correctAnswer')
  handleMessage(client: any, payload: leaderboardRecordType): void {
    this.leaderboards.push(payload);
    this.server.emit('renewLeaderboards', this.leaderboards);
  }

  async generateWord() {
    this.currentWord = {
      word: await this.wordService.getRandomWord(),
      timeOut:
        new Date().getTime() +
        Number(this.configService.get('CREATE_WORD_INTERVAL')),
    };
  }
}
