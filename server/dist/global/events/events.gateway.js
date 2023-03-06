"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let EventsGateway = class EventsGateway {
    constructor() {
        this.logger = new common_1.Logger('Gateway');
    }
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
    handleInitAttendance(socket, data) {
        this.logger.log('initAttendance', data);
        const { title, startTime } = JSON.parse(data);
        this.nsp.to(socket.id).emit('startAttendance', title);
        socket.broadcast.emit('startAttendance', JSON.stringify({ title, startTime }));
    }
    handleAttend(socket, data) {
        this.logger.log('attend', data);
        const { user } = JSON.parse(data);
        this.nsp.to(socket.id).emit('complete', JSON.stringify({ user }));
        socket.broadcast.emit('attendanceList', JSON.stringify({ attendanceList: [user] }));
    }
    handleConnection(socket) {
        this.logger.log(`${socket.id} 소켓 연결`);
    }
    handleDisconnect(socket) {
        this.logger.log(`${socket.id} 소켓 연결 해제 ❌`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Namespace)
], EventsGateway.prototype, "nsp", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('initAttendance'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleInitAttendance", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('attend'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleAttend", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleDisconnect", null);
EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'strc',
        cors: {
            origin: ['http://localhost:3000'],
        },
    })
], EventsGateway);
exports.EventsGateway = EventsGateway;
//# sourceMappingURL=events.gateway.js.map