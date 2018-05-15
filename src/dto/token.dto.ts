import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class TokenDto {
    @ApiModelProperty({
        type: String,
        required: true
    })
    @IsString()
    token: string;

    constructor(token) {
        this.token = token;
    }
}