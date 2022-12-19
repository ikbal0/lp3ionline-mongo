import { getToken } from "next-auth/jwt";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res){
    const token = await getToken({req, secret: process.env.JWT_SECREAT})
    if(!token){ 
        res.status(401).send({message: 'no access'})
    } else {
        const client = await clientPromise
        const testDb = await client.db("test-Db")
        const tableMatakuliah = await testDb.collection("tabelMatakuliah")
        if(req.method === "GET"){
            const data = await tableMatakuliah.find({}).toArray()
            if(data){
                res.json(data)
            } else {
                res.status(404).send({message: 'data null'})
            }
        }
    }
}