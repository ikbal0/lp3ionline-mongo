import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const client = await clientPromise
                const testDb = await client.db("test-Db")
                const userTbl = await testDb.collection("userTbl")
                const dataUser = await userTbl.findOne({email: credentials.email})
                // const loginData = await userTbl.aggregate([
                //     {   $match : { email : credentials.email }},
                //     {
                //         $lookup: {
                //             from: "tblDosen",
                //             localField: "_id",
                //             foreignField: "userId",
                //             as: "a"
                //         }
                //     },
                //     {
                //         $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$a", 0 ] }, "$$ROOT" ] } }
                //     },
                //     { $project: { a: 0, userId: 0 } }
                // ]).toArray()

                // const loginDataUser = {
                //     cred_email: credentials.email,
                //     cred_pass: credentials.password,
                //     email: loginData[0].email,
                //     password: loginData[0].password,
                //     _id: loginData[0]._id
                // }

                // console.log(loginDataUser)

                if (dataUser) {
                    if (credentials.password === dataUser.password){
                        return {
                            email: dataUser.email,
                            level: dataUser.level,
                            id: dataUser._id
                        }
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            }
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if(user){
                token.email = user.email,
                token.level = user.level,
                token.id = user.id
            }

            return token
        },
        session: ({ session, token }) => {
            if(token){
                session.email = token.email,
                session.level = token.level,
                session.id = token.id
            }

            return session
        },
    },
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.JWT_SECREAT,
    jwt: {
        maxAge: 30 * 24 * 60 * 60,
        secret: process.env.JWT_SECREAT,
    },
})