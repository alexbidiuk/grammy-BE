import { IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { MediaTypeEnum } from '../enums/media-type.enum';

export class MediaLinkDto {

    @ApiModelProperty()
    @IsNumber()
    type: MediaTypeEnum;

    @ApiModelProperty()
    @IsString()
    link: string;
}