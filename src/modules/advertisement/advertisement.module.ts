import { Module } from '@nestjs/common';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './advertisement.service';
import {AdvertisementRepository} from "./advertisement.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AdvertisementEntity} from "./advertisement.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AdvertisementEntity, AdvertisementRepository]),
  ],
  controllers: [AdvertisementController],
  providers: [AdvertisementService, AdvertisementRepository],
  exports: [AdvertisementService],
})
export class AdvertisementModule {}
