import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common';
import {AdvertisementService} from "./advertisement.service";
import {JsonView} from "../../helpers/jsonViews";
import {AdvertisementEntity} from "./advertisement.entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editImageFileName, imageFileFilter} from "../../helpers/file-upload";

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
    @UseInterceptors(
        FileInterceptor('images', {
            storage: diskStorage({
                destination: './files',
                filename: editImageFileName
            }),
            fileFilter: imageFileFilter,
        }),
    )
    public async create(@Body(new ValidationPipe({transform: true})) advertisementDto: AdvertisementEntity, @UploadedFile() file) {
        let urlPicture = '';
        if (file) {
            if (file.size > 5000000) {
                throw new HttpException('la taille du fichier ' + `${file.originalname}` + ' est superieur 5 Mo', HttpStatus.PAYLOAD_TOO_LARGE);
            } else {
                const response = {
                    originalname: file.originalname,
                    filename: file.filename
                };
                urlPicture = response.filename;
            }
        } else {
            urlPicture = null;
        }

        const advertisement = await this.advertisementService.createAdvertisement(advertisementDto, urlPicture);
        if (advertisement) {
            return JsonView.dataResponse(advertisement, 'success', HttpStatus.OK);
        }
        throw new HttpException("Echec de l'enregistrement", HttpStatus.NOT_MODIFIED);
    }

    @Put(':advertisementId')
    @UseInterceptors(
        FileInterceptor('images', {
            storage: diskStorage({
                destination: './files',
                filename: editImageFileName
            }),
            fileFilter: imageFileFilter,
        }),
    )
    public async updated(@Param('advertisementId') advertisementId, @Body(new ValidationPipe({transform:true})) advertisementDto, @UploadedFile() file) {
        let urlPicture = '';
        if (file) {
            if (file.size > 5000000) {
                throw new HttpException('la taille du fichier ' + `${file.originalname}` + ' est superieur 5 Mo', HttpStatus.PAYLOAD_TOO_LARGE);
            } else {
                const response = {
                    originalname: file.originalname,
                    filename: file.filename
                };
                urlPicture =  response.filename;
            }
        } else {
            urlPicture = null;
        }
        const advertisement = await this.advertisementService.updateAdvertisement(advertisementId, advertisementDto, urlPicture);
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
