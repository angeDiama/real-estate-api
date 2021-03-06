import { Module } from '@nestjs/common';
import { AdvertisementModule } from './modules/advertisement/advertisement.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {MulterModule} from "@nestjs/platform-express";

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmModule.forRoot(),
    AdvertisementModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
