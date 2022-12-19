import {getSession} from 'next-auth/react';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from "mongodb";
import fs from "fs";

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
};

export default async function handler(req, res) {
    const { soalId } = req.query
    
    const session = await getSession({req})
    if(session.level == '2'){
        const client = await clientPromise
        const testDb = await client.db("test-Db")
        const soalTable = await testDb.collection("soalTbl")
        if(req.method === "GET"){
            // res.end(`soal: ${soalId}`)
            const dataSoal = await soalTable.aggregate([
                {   
                    $match : { _id : new ObjectId(soalId) }
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
                dataSoal: dataSoal[0] 
                });
            }
        }
        if(req.method === "DELETE"){
            const response = await soalTable.findOne({_id: new ObjectId(soalId)})
            if(!response.fileName){
                res.status(404).send({ 
                message: 'data Soal not found'  
                });
            } else {
                const path = "public/uploads/" + response.fileName
    
                fs.unlink(path, async (err) => {
                    if(err) throw err
                    
                    const deletedSoal = await soalTable.deleteOne({_id: new ObjectId(soalId)})
    
                    if(deletedSoal.deletedCount == '0') {
                        res.status(404).send({ 
                        message: 'data Soal not found'  
                        });
                    } else {
                        res.status(204).send({ 
                        message: 'success',
                        });
                    }
    
                })
            }
        }
        if(req.method === "PUT"){
            const upload = multer({
                storage: multer.diskStorage({
                  destination: './public/uploads',
                  filename: (req, file, cb) => cb(null, file.originalname),
                }),
            });
            upload.array('file')
            
            const response = await soalTable.findOne({_id: new ObjectId(soalId)})
            if(!response.fileName){
                res.status(404).send({ 
                message: 'data Soal not found'  
                });
            } else {
                const path = "public/uploads/" + response.fileName
    
                fs.unlink(path, async (err) => {
                    if(err) throw err
                    
                    const deletedSoal = await soalTable.deleteOne({_id: new ObjectId(soalId)})
    
                    if(deletedSoal.deletedCount == '0') {
                        res.status(404).send({ 
                        message: 'data Soal not found'  
                        });
                    } else {
                        res.status(204).send({ 
                        message: 'success',
                        });
                    }
    
                })
            }
        }
    }
  }