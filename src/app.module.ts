import { Module } from '@nestjs/common';
import { AdvertisementModule } from './modules/advertisement/advertisement.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Connection} from "typeorm";

@Module({
  imports: [TypeOrmModule.forRoot(), AdvertisementModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
