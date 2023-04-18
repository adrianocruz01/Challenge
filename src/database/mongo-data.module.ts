import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from '../core/abstract/IDataServices.abstract';
import {
  User,
  UserSchema,
} from './schema';
import { MongoDataServices } from './mongo-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/challange'),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}