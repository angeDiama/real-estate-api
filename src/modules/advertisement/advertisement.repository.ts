import {Injectable} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {AdvertisementEntity} from "./advertisement.entity";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
@EntityRepository(AdvertisementEntity)
export class AdvertisementRepository extends Repository<AdvertisementEntity> {

    constructor(
        @InjectRepository(AdvertisementEntity)
        private readonly advertisementRepository: Repository<AdvertisementEntity>,
    ) {
        super();
    }

    public async findAll() {
        return this.advertisementRepository.find();
    }

    public async findById(id: number) {
        return this.advertisementRepository.findOne(id);
    }

    public async created(advertisement: AdvertisementEntity) {
        return this.advertisementRepository.save(advertisement);
    }

    public async updated(id: number, advertisement: AdvertisementEntity) {
        return this.advertisementRepository.update(id, advertisement);
    }

    public async deleted(advertisement: AdvertisementEntity) {
        return this.advertisementRepository.remove(advertisement)
    }
}
