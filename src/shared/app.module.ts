import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { DataServicesModule } from 'src/database/services/database.services.module';
import { AppController } from './app.controller';
import { UserUseCasesModule } from 'src/use-cases/user/user.use-case.module';
import { UserController } from 'src/http/user.controller';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    MulterModule.register({ dest: '/uploads' }),
    UserUseCasesModule,
    DataServicesModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}