import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import {GatewayMetadata} from "@nestjs/websockets/interfaces";

const gatewayOptions: GatewayMetadata = { path: '/socket', cors: { origin: ['localhost:4207'], methods: ["GET"] } };

@WebSocketGateway(gatewayOptions)
export class SessionGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
