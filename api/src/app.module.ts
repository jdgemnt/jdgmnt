import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionGateway } from './session/session.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SessionGateway],
})
export class AppModule {}
