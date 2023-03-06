import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'strc',
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('Gateway');
  @WebSocketServer() nsp: Namespace;

  // 초기화 이후에 실행
  afterInit() {
    this.nsp.adapter.on('create-room', (room) => {
      this.logger.log(`"Room:${room}"이 생성되었습니다.`);
    });

    this.nsp.adapter.on('join-room', (room, id) => {
      this.logger.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
    });

    this.nsp.adapter.on('leave-room', (room, id) => {
      this.logger.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
    });

    this.nsp.adapter.on('delete-room', (roomName) => {
      this.logger.log(`"Room:${roomName}"이 삭제되었습니다.`);
    });

    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  @SubscribeMessage('initAttendance')
  handleInitAttendance(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: string,
  ) {
    this.logger.log('initAttendance', data);

    const { title, startTime } = JSON.parse(data);

    this.nsp.to(socket.id).emit('startAttendance', title);
    socket.broadcast.emit(
      'startAttendance',
      JSON.stringify({ title, startTime }),
    );
  }

  @SubscribeMessage('attend')
  handleAttend(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    this.logger.log('attend', data);

    const { user } = JSON.parse(data);
    this.nsp.to(socket.id).emit('complete', JSON.stringify({ user }));
    socket.broadcast.emit(
      'attendanceList',
      JSON.stringify({ attendanceList: [user] }),
    );
  }

  // 소켓이 연결되면 실행
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`${socket.id} 소켓 연결`);
  }

  // 소켓 연결이 끊기면 실행
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`${socket.id} 소켓 연결 해제 ❌`);
  }
}
