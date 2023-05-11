import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(5001, { transports: ['websocket'] })
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    this.server.emit('message', payload);
  }

  handleConnection(client: any) {
    console.log('Client connected');
    console.log(client);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
    console.log(client);
  }
}
