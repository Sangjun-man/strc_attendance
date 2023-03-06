import { CacheModule, Module } from '@nestjs/common';
import { EventsModule } from 'src/global/events/events.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EventsModule, CacheModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
