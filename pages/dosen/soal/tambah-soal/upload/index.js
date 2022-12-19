import Link from "next/link";
import Head from "next/head";
import SideNav from "../../../../../lib/dosen/SideNav";
import { useFormik } from "formik";
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { sola_validate } from "../../../../../lib/validate";
import axios from "axios";
import { useRouter } from "next/router";

export default function uploadSoal({kelas}){

    function MyCarousel() {
        return (
            <div className="p-5 text-white" style={{backgroundColor:'#00426D'}}>
                <h1 className="text-light">Upload Soal</h1>
                <p>Masukan data soal</p>
                <h4>
                    <Link href="/dosen/soal">
                        <a className="text-warning"
                        style={{
                            'color': 'white'
                        }}
                        >Soal</a> 
                    </Link>
                    {' > '}
                    <Link href="/dosen/soal/tambah-soal">
                        <a className="text-warning"
                        style={{
                            'color': 'white'
                        }}
                    >Tambah soal</a>
                    </Link>
                    {' > '}
                    <text className="text-light">Upload</text>
                </h4>
            </div>
        )
    }

    function AddQuiz() {
        const [fileUpload, setFile] = useState(null)
        const router = useRouter()
        const [isLoading, setLoading] = useState(false)
        const [data, setData] = useState({
            idMatakuliah: null,
            idDosen: null
        })

        useEffect(() => {

            let isCancelled = false;
    
            if (!isCancelled){
                fetchDosen()
                setLoading(false)
            }
    
            return () => {
                isCancelled = true;
            }
        }, [])

        async function fetchDosen() {
            const response = await fetch('/api/dosen/profilePerDosenId/auth')
            if (response.status == 200) {
                const dataMatakuliah = await response.json()
                console.log(dataMatakuliah.data.matakuliahId)
                setData({
                    ...data,
                    idMatakuliah: dataMatakuliah.data.matakuliahId,
                    idDosen: dataMatakuliah.data._id
                })
            } else {
                setData({
                    ...data,
                    idMatakuliah: null
                })
            }
        }

        const formik = useFormik({
            initialValues: {
                topik: '',
                kelasId: '',
                tanggal: '',
                batasWaktu: ''
            },
            validate: sola_validate,
            onSubmit
        })
    
        async function onSubmit(values) {
            const formData = new FormData()
            const fileName = Date.now().toString() + fileUpload.name

            formData.append("topik", values.topik)
            formData.append("kelasId", values.kelasId)
            formData.append("tanggal", values.tanggal)
            formData.append("batasWaktu", values.batasWaktu)
            formData.append("idDosen", data.idDosen)
            formData.append("idMatakuliah", data.idMatakuliah)
            formData.append("file", fileUpload, fileName)
            formData.append("fileName", fileName)

            const endpoint = '/api/soal'

            const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            }

            const response = await axios.post(endpoint, formData, options)

            alert(response.data.message)
            if(response.data.message == 'success') {
                router.push('/dosen/soal/')
                // console.log('push')
            }
        }

        if(!kelas){
            return <h2>something wrong</h2>
        }
        if(isLoading){
            return <h2>Wait a moment, Loading...</h2>
        }
        if(!data.idMatakuliah){
            return <h2>Wait a moment, Loading... prepare data Matakuliah</h2>
        }
        if(!data.idDosen){
            return <h2>Wait a moment, Loading... prepare data Dosen</h2>
        }

        return (
            <div className="card p-5">
                <div className="card-header">
                    Data soal
                </div>
                <form onSubmit={formik.handleSubmit} style={{paddingTop:'30px'}}>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="inputJudul" className="form-label">Judul</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inputJudul" 
                                    placeholder="Mata Kuliah - Tugas/Ulangan - dll"
                                    name="topik"
                                    {...formik.getFieldProps('topik')}
                                    />
                                    {formik.errors.topik && formik.touched.topik ? 
                                    <span className="text-danger">{formik.errors.topik}</span>
                                    :<p className="card-text"><small className="text-muted">Masukan judul untuk lembar soal</small></p>
                                    }
                                    
                                </div>
                                <div className="col-12">
                                    <label htmlFor="inputAddress2" className="form-label">Batas Waktu</label>
                                    <input 
                                    name="batasWaktu" 
                                    type="text" 
                                    className="form-control" 
                                    id="inputAddress2" 
                                    placeholder="..Menit"
                                    {...formik.getFieldProps('batasWaktu')}
                                    />
                                    {formik.errors.batasWaktu && formik.touched.batasWaktu ? 
                                    <span className="text-danger">{formik.errors.batasWaktu}</span>
                                    :<p className="card-text"><small className="text-muted">Masukan Batas waktu pengerjaan soal dalam format menit</small></p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="inputJudul" className="form-label">Tanggal</label>
                                    <input 
                                    type="datetime-local" 
                                    className="form-control" 
                                    id="inputJudul" 
                                    name="tanggal"
                                    {...formik.getFieldProps('tanggal')}
                                    />
                                    {formik.errors.tanggal && formik.touched.tanggal ? 
                                    <span className="text-danger">{formik.errors.tanggal}</span>
                                    :<p className="card-text"><small className="text-muted">Kapan soal akan di kerjakan</small></p>
                                    }
                                </div>
                                <div className="col-12">
                                    <label htmlFor="inputKelas" className="form-label">Kelas</label>
                                    <select 
                                    className="form-select"
                                    name="kelasId"
                                    defaultValue=""
                                    {...formik.getFieldProps('kelasId')}
                                    >
                                        <option value="" disabled>Pilih...</option>
                                        {
                                            kelas.map((f) => {
                                                return <option key={f._id} value={f._id}>{f.kelas}</option>
                                            })
                                        }
                                    </select>
                                    {formik.errors.kelasId && formik.touched.kelasId ? 
                                    <span className="text-danger">{formik.errors.kelasId}</span>
                                    :<p className="card-text"><small className="text-muted">Pilih Kelas</small></p>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <hr/>
                        <div className="col-12">
                            <label htmlFor="formFile" className="form-label">Default file input example</label>
                            <br/>
                            <div 
                            className="FileInput text-center align-content-center"
                            style={{
                                'border': '2px dashed grey',
                                'width': '100%',
                                'height': '200px',
                                'position': 'relative',
                            }}
                            >
                                <div style={{
                                    'marginLeft': '-100%'
                                }}>
                                    <input 
                                    style={{
                                        'outline': 'none',
                                        'background': 'yellow',
                                        'opacity': '0',
                                        'position': 'absolute',
                                        'height': '100%',
                                        'width': '100%'
                                    }} 
                                    type="file" 
                                    id="formFile"
                                    name="file"
                                    onChange={(event) => {
                                        setFile(event.currentTarget.files[0])
                                    }}
                                    />
                                </div>
                                <p
                                style={{
                                    'height': '100%',
                                    'textAlign': 'center',
                                    'lineHeight': '180px',
                                    // 'position': 'absolute',
                                    // 'background': 'red',
                                    'width': '100%',
                                    // 'justifyContent': 'center',
                                }}
                                >{fileUpload ? fileUpload.name : 'Drag your files here or click in this area.'}</p>
                            </div>
                            
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn" style={{backgroundColor:'#00426D', color:'white'}}>Simpan</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    return(
        <>
            <Head>
                <title>Tambah Kelas</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            </Head>
            <MyCarousel/>
            <div className="overflow-hidden">
                <div className="row">
                    <div className="col-2">
                        <SideNav/>
                    </div>
                    <div className="col">
                        <AddQuiz/>
                    </div>
                </div>
            </div>

        </>
    )
}

uploadSoal.getLayout = function getLayout(page) {
    return page
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session){
        if(session.level == '1'){
            return {
                redirect: {
                    permanent: false,
                    destination: "/peserta"
                }
            }
        } else if(session.level == '3'){
            return {
                redirect: {
                    permanent: false,
                    destination: "/dashboard-admin"
                }
            }
        }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }

    const header = context.req.headers;

    const response = await fetch('http://localhost:3000/api/kelas', {
        headers: {
            Cookie: header.cookie
        }
    })
    if(response.status == 200){
        const data = await response.json()
      
        return {
            props: {
                kelas: data,
            }
        }
    } else {
        return {
            props: {
                kelas: null,
            }
        }
    }
  }