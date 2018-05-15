import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { MediaLinkDto } from './media-link.dto';

export class NewsDto {
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
        type: String,
        required: true
    })
    @IsString()
    subtitle: string;

    @ApiModelProperty({
        type: String,
        required: true
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiModelProperty({
        type: [ MediaLinkDto ],
        required: false
    })
    @ValidateNested()
    @IsOptional()
    mediaLinks: MediaLinkDto[];
}