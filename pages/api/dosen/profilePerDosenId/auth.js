import { getToken } from "next-auth/jwt";
import clientPromise from "../../../../lib/mongodb";
import {getSession} from 'next-auth/react';
import { ObjectId } from "mongodb";

export default async function handler(req, res){
    const token = await getToken({req, secret: process.env.JWT_SECREAT})
    const session = await getSession({req})
    if(token) {
        const client = await clientPromise
        const testDb = await client.db("test-Db")
        const tblDosen = await testDb.collection("tblDosen")
    
        if(req.method === "GET"){
            if(!session){
                res.status(401).send({message: 'not authenticated'})
            } else {
                const data = await tblDosen.aggregate([
                    {   
                        $match : { userId : new ObjectId(session.id) }
                    },
                    {
                        $lookup: {
                            from: "tabelMatakuliah",
                            localField: "matakuliahId",
                            foreignField: "_id",
                            as: "a"
                        }
                    },
                    {
                        $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$a", 0 ] }, "$$ROOT" ] } }
                    },
                    {
                        $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$b", 0 ] }, "$$ROOT" ] } }
                    },
                    { $project: { a: 0, userId: 0 } }
                ]).toArray()

                res.status(200).send({
                    message: 'success', 
                    data: data[0]
                })
            }
        }
    } else {
        res.status(401).send({message: 'not authenticated'})
    }
}