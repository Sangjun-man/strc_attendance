import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
export declare class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger;
    nsp: Namespace;
    afterInit(): void;
    handleInitAttendance(socket: Socket, data: string): void;
    handleAttend(socket: Socket, data: any): void;
    handleConnection(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
}
