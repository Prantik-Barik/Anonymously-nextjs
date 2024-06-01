import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id : "credentials",
            name : "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@email.com" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials: any): Promise<any>{
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email : credentials.identifier},
                            {username : credentials.identifier}
                        ]
                    })

                    if(!user){
                        throw new Error('No user found with thi email')
                    }
                    if(!user.isVerified){
                        throw new Error('Please verify your account before login')
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if(!isPasswordCorrect){
                        throw new Error('Incorrecrt Password')
                    }

                    return user
                } catch (err : any) {
                    throw new Error(err)
                }
              }
        })
    ],
    callbacks : {
        async jwt({token , user}){
            if(user){
                token._id = 
            }
            
            return token
        },
        async session({session, token}){
            return session
        }
    },
    pages : {
        signIn: '/signin'
    },
    session: {
        strategy : "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET

}