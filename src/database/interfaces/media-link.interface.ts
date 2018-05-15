import { MediaTypeEnum } from '../../enums/media-type.enum';
export interface IMediaLink {
    type: MediaTypeEnum;
    link: string;
}