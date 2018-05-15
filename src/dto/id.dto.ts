import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class IdDto {
    @ApiModelProperty({
        type: String,
        required: true
    })
    @IsString()
    id: string;
}