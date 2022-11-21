import {Prop, Schema} from "@nestjs/mongoose";

export class Contacts{
    telefon: string;
    email: string;
    telegram: string;
    whatsApp: string;
}

@Schema()
export class AdSchema{

    @Prop()
    search: "roommate" | "room"

    @Prop()
    userid : string;

    @Prop()
    creationData : Date;

    @Prop()
    mainText: string;

    @Prop()
    contacts: Contacts;

    @Prop()
    aprPictures: Array<String> | undefined;                             // pictures of the apartment

    @Prop()
    paused: boolean;                                                    // people can pause their announcements
}