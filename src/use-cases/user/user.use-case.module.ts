import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/database/services/database.services.module';
import { UserService } from './user.use-case.service';
import { UserUseCases } from './user.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [UserService, UserUseCases],
  exports: [UserService, UserUseCases],
})
export class UserUseCasesModule {}