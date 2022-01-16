import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {AdvertisementService} from "./advertisement.service";
import {JsonView} from "../../helpers/jsonViews";
import {AdvertisementEntity} from "./advertisement.entity";

@Controller('advertisement')
export class AdvertisementController {
    constructor(
        private readonly advertisementService: AdvertisementService,
    ) {}

    @Get()
    public async getAll() {
        const advertisement = await this.advertisementService.getAll();
        return JsonView.dataResponse(advertisement, '', HttpStatus.OK);
    }

    @Get(':advertisementId')
    public async getOne(@Param('advertisementId') advertisementId) {
        const advertisement = await this.advertisementService.getOne(advertisementId);
        if (advertisement) {
            return JsonView.dataResponse(advertisement, '', HttpStatus.OK);
        }
        throw new HttpException("Cette annonce n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Post()
    public async create(@Body() advertisementDto: AdvertisementEntity) {
        const advertisement = await this.advertisementService.createAdvertisement(advertisementDto);
        if (advertisement) {
            return JsonView.dataResponse(advertisement, '', HttpStatus.OK);
        }
        throw new HttpException("Echec de l'enregistrement", HttpStatus.NOT_MODIFIED);
    }

    @Put(':advertisementId')
    public async updated(@Param('advertisementId') advertisementId, @Body() advertisementDto) {
        const advertisement = await this.advertisementService.updateAdvertisement(advertisementId, advertisementDto);
        if (advertisement) {
            return JsonView.dataResponse(advertisement, '', HttpStatus.OK);
        }
        throw new HttpException("Cette annonce n'existe pas", HttpStatus.NOT_FOUND);
    }

    @Delete(':advertisementId')
    public async remove(@Param('advertisementId') advertisementId) {
        const advertisement = await this.advertisementService.deleteAdvertisement(advertisementId);
        if (advertisement) {
            return JsonView.dataResponse(advertisement, '', HttpStatus.OK);
        }
        throw new HttpException("Cette annonce n'existe pas", HttpStatus.NOT_FOUND);
    }

}
