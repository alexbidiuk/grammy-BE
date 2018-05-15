import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class LoginDto {
    @ApiModelProperty({
        type: String,
        required: true
    })
    @IsString()
    username: string;

    @ApiModelProperty({
        type: String,
        required: true
    })
    @IsString()
    password: string;
}