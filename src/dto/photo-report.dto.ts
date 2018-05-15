import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { MediaLinkDto } from './media-link.dto';

export class PhotoReportDto {
    @ApiModelProperty({
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    _id: string;

    @ApiModelProperty({
        type: String,
        required: true
    })
    @IsString()
    title: string;

    @ApiModelProperty({
        type: [ MediaLinkDto ],
        required: false
    })
    @ValidateNested()
    mediaLinks: MediaLinkDto[];
}