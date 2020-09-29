import {ComicService} from "./comic.service";
import {ComicController} from "./comic.controller";
import {ComicEntity} from "./comic.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                ComicEntity
            ],
            'default'
        )
    ],
    controllers: [
        ComicController
    ],
    providers: [
        ComicService
    ],
})


export class ComicModule{

}