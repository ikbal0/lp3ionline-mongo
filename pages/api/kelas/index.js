import {getSession} from 'next-auth/react';
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res){
    const session = await getSession({req})
    if(!session){ 
        res.json({message: 'no access'})
    } else {
        const client = await clientPromise
        const testDb = await client.db("test-Db")
        const tblKelas = await testDb.collection("tblKelas")
        if(req.method === "GET"){
            const data = await tblKelas.aggregate([
                {
                    $lookup: {
                        from: "tabelJurusan",
                        localField: "idJurusan",
                        foreignField: "_id",
                        as: "a"
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$a", 0 ] }, "$$ROOT" ] } }
                },
                { $project: { a: 0, idJurusan: 0 } }
            ]).toArray()

            res.json(data)
        }
    }
}