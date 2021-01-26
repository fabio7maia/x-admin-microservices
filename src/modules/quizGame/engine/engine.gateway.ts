import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ path: '/ws/events' })
export class QuizzesEngineGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('QuizzesEngineGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log('emit > msgToClient');
    this.server.emit('msgToClient', payload);
  }

  @SubscribeMessage('invite')
  handleInvite(client: Socket, payload: string): void {
    this.logger.log(`emit > invite > ${payload}}`);

    const payloadObj = JSON.parse(payload);

    this.logger.log(
      `emit > invite > ${JSON.stringify({
        audience: [payloadObj.clientId],
        clientId: payloadObj.clientId,
        refererClientId: client.id,
      })}`,
    );

    this.server.emit('invite', {
      audience: [payloadObj.clientId],
      clientId: payloadObj.clientId,
      refererClientId: client.id,
    });
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, payload: string): void {
    this.logger.log(`emit > join > ${payload}}`);

    const payloadObj = JSON.parse(payload);

    this.logger.log(
      `emit > join > ${JSON.stringify({
        audience: [payloadObj.clientId, client.id],
        roomId: client.id,
      })}`,
    );

    this.server.emit('join', {
      audience: [payloadObj.clientId, client.id],
      roomId: client.id,
    });
  }

  afterInit(server: Server) {
    // this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    // this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    // this.logger.log(`Client connected: ${client.id}`);
  }
}
