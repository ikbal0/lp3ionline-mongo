import clientPromise from "../../lib/mongodb";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
    const token = await getToken({req, secret: process.env.JWT_SECREAT})
    if(token) {
        const client = await clientPromise
        const testDb2 = await client.db("test-Db2")
        const testDb = await client.db("test-Db")
        const tblTest = await testDb2.collection("tblTest")
        const tblIn = await testDb2.collection("tblIn")
        const userTbl = await testDb.collection("userTbl")
    
        if(req.method === "POST"){
            const queue = await tblTest.insertOne({
                status: 'onProcess'
            })

            function runFunction(){
                console.log(queue.insertedId)
            }

            const t = setInterval(runFunction,1000);

            setTimeout(async () => {
                await tblIn.insertOne({
                    time: new Date(),
                    queueId: queue.insertedId,
                })

                await tblTest.updateOne(
                    {_id: new ObjectId(queue.insertedId)}, 
                    {$set: { status: 'complete' }}
                )

                clearInterval(t)
            }, "31000")
    
            // console.log(queue)
    
            res.send({queue})
        }
    
        if(req.method === "GET"){
            const login = await userTbl.aggregate([
                {   $match : { email : "dadang@gmail.com" }},
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

            const data = await tblTest.aggregate([
                {
                    $lookup: {
                        from: "tblIn",
                        localField: "_id",
                        foreignField: "queueId",
                        as: "a"
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$a", 0 ] }, "$$ROOT" ] } }
                },
                { $project: { a: 0, queueId: 0 } }
            ]).toArray()
            res.send({
                message: 'hi', 
                d:{ 
                    login
                }, 
                data
            })
        }
    } else {
        res.status(401).send({message: 'not authenticated'})
    }
}