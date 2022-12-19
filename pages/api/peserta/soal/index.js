import nextConnect from 'next-connect';
import multer from 'multer';
import {getSession} from 'next-auth/react';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../../lib/mongodb';

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
  if(!session.level){
    res.status(401).send({message: 'no access'})
  }
  next()
}

apiRoute.use(upload.array('file'));
apiRoute.use(auth)

apiRoute.post( async (req, res) => {
  const client = await clientPromise
  const testDb = await client.db("test-Db")
  const soalTable = await testDb.collection("soalTbl")
  
  const response = await soalTable.insertOne({
    topik: req.body.topik,
    kelasId: new ObjectId(req.body.kelasId),
    tanggal: req.body.tanggal,
    fileName: req.body.fileName,
    idDosen: new ObjectId(req.body.idDosen),
    idMatakuliah: new ObjectId(req.body.idMatakuliah),
    batasWaktu: req.body.batasWaktu
  })

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

apiRoute.get(async (req, res) => {
  const session = await getSession({req})
  const client = await clientPromise
  const testDb = await client.db("test-Db")
  const soalTable = await testDb.collection("soalTbl")
  const userTbl = await testDb.collection("userTbl")
  
  const data = await userTbl.aggregate([
    {   
      $match : { 
        _id : new ObjectId(session.id) 
      }
    },
    {
      $lookup: {
        from: "tblMahasiswa",
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

  const dataSoal = await soalTable.aggregate([
    {   
      $match : { 
        kelasId : new ObjectId(data[0].idKelas)
      }
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
      $lookup: {
        from: "tblDosen",
        localField: "idDosen",
        foreignField: "_id",
        as: "b"
      }
    },
    {
      $lookup: {
        from: "tabelMatakuliah",
        localField: "idMatakuliah",
        foreignField: "_id",
        as: "c"
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$a", 0 ] }, "$$ROOT" ] } }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$b", 0 ] }, "$$ROOT" ] } }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$c", 0 ] }, "$$ROOT" ] } }
    },
    { $project: { a: 0, b: 0, c: 0, userId: 0 } }
  ]).toArray()

  if(!dataSoal) {
    res.status(404).send({ 
    message: 'data not found'  
    });
  } else {
    res.status(200).send({ 
    message: 'success',
    data: dataSoal
    });
  }
});

apiRoute.put( async (req, res) => {
  const client = await clientPromise
  const testDb = await client.db("test-Db")
  const soalTable = await testDb.collection("soalTbl")
  const ress = await soalTable.updateOne({name: nameOfListing},
    {$set: updatedListing})
  const response = await soalTable.insertOne({
    topik: req.body.topik,
    kelasId: new ObjectId(req.body.kelasId),
    tanggal: req.body.tanggal,
    fileName: req.body.fileName,
    idDosen: new ObjectId(req.body.idDosen),
    idMatakuliah: new ObjectId(req.body.idMatakuliah),
    batasWaktu: req.body.batasWaktu
  })

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