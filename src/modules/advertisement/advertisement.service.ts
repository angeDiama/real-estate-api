import {HttpException, HttpStatus, Injectable, InternalServerErrorException} from '@nestjs/common';
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
    public async getAdvertisementPicture(advertisementId: number) {
        const advertisement = await this.advertisementRepository.findById(advertisementId);
        if (advertisement) {
            let fileName: string = null;
            const url = advertisement?.getUrlPicture();
            if (url == null) {
                throw new HttpException("Cette image n'existe pas", HttpStatus.NOT_FOUND);
            }
            const formatUrlData = url.split("./files/");
            fileName = formatUrlData[1];
            return fileName;
        }
        throw new HttpException("Cette annonce n'existe pas", HttpStatus.NOT_FOUND);
    }


    public async createAdvertisement(advertisement: AdvertisementEntity, urlPicture: string) {
        if(urlPicture) {
            advertisement.setUrlPicture(urlPicture)
        }
        const newAdvertisement = await this.advertisementRepository.created(advertisement);
        if (newAdvertisement) {
            return newAdvertisement;
        } else {
            return null;
        }

    }

    public async updateAdvertisement(id: number, advertisement: AdvertisementEntity, urlPicture: string) {
        if(urlPicture) {
           advertisement.setUrlPicture(urlPicture);
        }
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
