import { IsString, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { MediaLinkDto } from './media-link.dto';

export class EventDto {
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
    name: string;

    @ApiModelProperty({
        type: String,
        required: true
    })
    @IsString()
    date: string;

    @ApiModelProperty({
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    price: string;

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
        required: false
    })
    @IsString()
    @IsOptional()
    paymentLink: string;

    @ApiModelProperty({
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    getResponseLink: string;

    @ApiModelProperty({
        type: String,
        required: false
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

    @ApiModelProperty({
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    logoLink: string;

    @ApiModelProperty({
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    posterLink: string;
}