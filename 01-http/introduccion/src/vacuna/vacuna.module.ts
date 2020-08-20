import {TypeOrmModule} from "@nestjs/typeorm";
import {VacunaEntity} from "./vacuna.entity";
import {Module} from "@nestjs/common";

@Module({
    controllers: [],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    VacunaEntity
                ],
                'default' // Nombre cadena de conexión
            )
    ],
    providers: []
})
export class VacunaModule {

}