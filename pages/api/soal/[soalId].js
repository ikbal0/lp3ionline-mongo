import nextConnect from 'next-connect';
import multer from 'multer';
import {getSession} from 'next-auth/react';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const auth = async (req, res, next) => {
  const session = await getSession({req})
  if(session.level != '2'){
    res.status(401).send({message: 'no access'})
  }
  next()
}

apiRoute.use(upload.array('file'));
apiRoute.use(auth)

apiRoute.put( async (req, res) => {
    const { soalId } = req.query
    const client = await clientPromise
    const testDb = await client.db("test-Db")
    const soalTable = await testDb.collection("soalTbl")
    const verifyFileName = await soalTable.findOne({_id: new ObjectId(soalId)})
    console.log(verifyFileName)
    if(verifyFileName.fileName != req.body.fileName){
      console.log('delete existed file')
      const path = "public/uploads/" + verifyFileName.fileName
      fs.unlink(path, async (err) => {
        if(err) throw err
      })
    }
    const response = await soalTable.updateOne({_id: new ObjectId(soalId)},
        {$set: {
            topik: req.body.topik,
            kelasId: new ObjectId(req.body.kelasId),
            tanggal: req.body.tanggal,
            fileName: req.body.fileName,
            batasWaktu: req.body.batasWaktu
        }})

    if(response.acknowledged){
        res.status(200).send({ 
        message: 'success'
        });
    } else {
        res.status(402).send({ 
        message: 'fail'
        });
    }
});

apiRoute.delete((req, res) => {
  res.status(200).json({ data: 'delete'});
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};