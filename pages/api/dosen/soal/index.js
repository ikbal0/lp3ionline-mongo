import {getSession} from 'next-auth/react';
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res){
    const session = await getSession({req})
    if(session.level == '2'){
        const client = await clientPromise
        const testDb = await client.db("test-Db")
        const userTbl = await testDb.collection("userTbl")
        if(req.method === "GET"){
            const data = await userTbl.aggregate([
                {   
                    $match : { _id : new ObjectId(session.id) }
                },
                {
                    $lookup: {
                        from: "tblDosen",
                        localField: "_id",
                        foreignField: "userId",
                        as: "a"
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$a", 0 ] }, "$$ROOT" ] } }
                },
                { $project: { a: 0, userId: 0 } }
            ]).toArray()

            
            const soalTable = await testDb.collection("soalTbl")
            const dataSoal = await soalTable.aggregate([
                {   
                    $match : { idDosen : new ObjectId(data[0]._id) }
                },
                {
                    $lookup: {
                        from: "tblKelas",
                        localField: "kelasId",
                        foreignField: "_id",
                        as: "a"
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$a", 0 ] }, "$$ROOT" ] } }
                },
                { $project: { a: 0, userId: 0 } }
            ]).toArray()

            if(!dataSoal) {
                res.status(404).send({ 
                message: 'data Soal not found'  
                });
            } else {
                res.status(200).send({ 
                message: 'success',
                dataSoal 
                });
            }
        }
    } else {
        res.status(401).send({message: 'not authenticated'})
    }
}