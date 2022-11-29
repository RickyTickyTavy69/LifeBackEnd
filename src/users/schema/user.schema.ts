import {SchemaFactory, Schema, Prop} from "@nestjs/mongoose";

import {Document} from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({unique: true})
    name: string

    @Prop({unique: true})
    email: string

    @Prop()
    password: string

    @Prop()
    password2: string

    @Prop()
    salt: string

    @Prop()
    verified: boolean

    @Prop()
    code: string
}

export const  UserSchema = SchemaFactory.createForClass(User);