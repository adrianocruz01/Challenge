import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from '../core/abstract/IDataServices.abstract';
import {
  User,
  UserDocument,
} from './schema';
import { MongoGenericRepository } from './repositories/IMongoGeneric.repositories';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  users: MongoGenericRepository<User>;
  constructor(
    @InjectModel(User.name)
    private UserRepository: Model<UserDocument>,

  ) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<User>(this.UserRepository);
  }
}