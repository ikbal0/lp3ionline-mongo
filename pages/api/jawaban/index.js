import nextConnect from 'next-connect';
import multer from 'multer';
import {getSession} from 'next-auth/react';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

class DataSource {
    async getData() {
        const client = await clientPromise
        const testDb = await client.db("test-Db")
        return testDb
    }
}

let dataSource = new DataSource()

class Jawaban {
    async getData(){
        const testDb = await dataSource.getData()
        const tblJawaban = await testDb.collection("tblJawaban")
        const data = await tblJawaban.find({}).toArray()
        return data
    }
    async setData(namaFileJawaban, soalId, idUser){
      const testDb = await dataSource.getData()
      const tblMahasiswa = await testDb.collection("tblMahasiswa") 
      const idMahasiswa = await tblMahasiswa.findOne({userId: new ObjectId(idUser)})
      const tblJawaban = await testDb.collection("tblJawaban")
      // console.log({
      //     namaFileJawaban,
      //     soalId,
      //     idMahasiswa: idMahasiswa._id
      // })
      const data = await tblJawaban.insertOne({
        namaFileJawaban,
        soalId:  new ObjectId(soalId),
        idMahasiswa: idMahasiswa._id
      })
      if(data.acknowledged){
          console.log({message: `'success' ${data.insertedId}`, data})
        } else {
          console.log('fail')
      }
      // return data
    }
}

let jawaban = new Jawaban()

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/jawaban',
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
    const session = await getSession({req})

    const testDb = await dataSource.getData()
    const tblMahasiswa = await testDb.collection("tblMahasiswa") 
    const idMahasiswa = await tblMahasiswa.findOne({userId: new ObjectId(session.id)})
    const tblJawaban = await testDb.collection("tblJawaban")
    // console.log({
    //     namaFileJawaban,
    //     soalId,
    //     idMahasiswa: idMahasiswa._id
    // })
    const data = await tblJawaban.insertOne({
      namaFileJawaban: req.body.fileName,
      soalId:  new ObjectId(req.body.idSoal),
      idMahasiswa: idMahasiswa._id,
    })
    if(data.acknowledged){
        console.log({message: `'success' ${data.insertedId}`, data})
      } else {
        console.log('fail')
    }
    // jawaban.setData(req.body.fileName, req.body.idSoal, session.id)

    try {
        res.status(202).send({
          message: 'success',
          idJawaban: data.insertedId
        })
    } catch (error) {
        res.status(404).send({
            message: 'data not found'
        })
    }
});

apiRoute.get(async (req, res) => {
    const data = await jawaban.getData()
    try {
        res.status(202).send({
            message: 'success',
            data
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            message: 'data not found'
        })
    }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};