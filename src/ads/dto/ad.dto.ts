import {Contacts} from "../schema/ad.schema";

export class AdDto{
    search: "roommate" | "room";
    userid : string;
    creationData : Date;
    mainText: string;
    contacts: Contacts;
    aprPictures: Array<String> | undefined;
}