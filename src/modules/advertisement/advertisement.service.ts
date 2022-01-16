import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {AdvertisementRepository} from "./advertisement.repository";
import {AdvertisementEntity} from "./advertisement.entity";

@Injectable()
export class AdvertisementService {
    constructor(
        private readonly advertisementRepository: AdvertisementRepository,
    ) {}

    public  async getAll() {
        return this.advertisementRepository.findAll();
    }

    public async getOne(id: number) {
        const advertisement = await this.advertisementRepository.findById(id);
        if (advertisement) {
            return advertisement;
        }
        return null;
    }

    public async createAdvertisement(advertisement: AdvertisementEntity) {
        return this.advertisementRepository.created(advertisement);
    }

    public async updateAdvertisement(id: number, advertisement: AdvertisementEntity) {
        await this.advertisementRepository.updated(id, advertisement);
        return this.advertisementRepository.findById(id);
    }

    public async deleteAdvertisement(id: number) {
        const advertisement = await this.advertisementRepository.findById(id);
        if (advertisement) {
            try{
                return await this.advertisementRepository.deleted(advertisement);
            } catch (e) {
                throw new InternalServerErrorException('Impossible de supprimer. Car cet élément est en cours d\'utilisation');
            }
        }
        return null;
    }

}
