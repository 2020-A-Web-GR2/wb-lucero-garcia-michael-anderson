import {Module} from '@nestjs/common'
import {HttpCalculatorController} from "./http-calculator.controller";

//@nombre() ----> decorador

@Module({
    imports:[

    ],
    controllers:[
        HttpCalculatorController
    ],
    providers:[

    ],
})

export class HttpCalculatorModule{

}