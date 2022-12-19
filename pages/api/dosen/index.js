import { getToken } from "next-auth/jwt";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res){
    const token = await getToken({req, secret: process.env.JWT_SECREAT})
    if(!token){ 
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