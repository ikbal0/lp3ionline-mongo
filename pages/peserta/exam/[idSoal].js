import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ExamPage(params) {
    const [soal, setSoal] = useState(null)
    const [fileUpload, setFile] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [show, setShow] = useState(true)
    const router = useRouter()
    const { idSoal } = router.query

    function Modal() {
        return(
            <>
            <div 
            className={`modal fade ${show ? 'show' : ''}`}
            style={{
                'display': `${show ? 'block' : 'none'}`
            }}
            id="exampleModal" tabIndex="-1" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true">
                <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header p-5 bg-warning text-white text-center">
                        <div className="row">
                            <h1>Panduan</h1>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="text-center border border-warning p-4">
                            <h3>Perhatikan</h3>
                            <p>Halaman tidak boleh di tutup atau di reload</p>
                        </div>
                        <div className="mt-3">
                            <p>Pastikan pilih <strong>Seluruh layar/Entire Screen</strong></p>
                            <p>Kemudian <strong>Share</strong></p>
                            <Image src={'/aaaaaa.png'} width="1920" height="1080"/>
                        </div>
                        <div className="mt-5">
                            <p>Untuk menyembunyikan Pop up screen capture</p>
                            <p>Klik <strong>Hide/Sembunyikan</strong> seperti di bawah</p>
                            <Image className="border border-danger" src={'/aaaaaaaa.png'} width="1044" height="225"/>
                        </div>
                        <div className="mt-4">
                            <p>Kerjakan di tempat dengan <strong>pencaayaan yang baik</strong></p>
                            <p><strong>Tidak ada suara</strong> yang dapat mengganggu</p>
                            <p><strong>Brepakaian dan berprilaku sopan</strong> selama mengejakan</p>
                            <p><strong>Dilarang makan, merokok dan minum</strong>saat mengerjakan</p>
                            <p>klik <strong>Mengerti/Understand</strong> jika sudah siap</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Link
                        href={'/peserta/'}>
                        <a 
                        type="button" 
                        className="btn btn-secondary" 
                        data-bs-dismiss="modal" 
                        >Cancel
                        </a>
                        </Link>
                        <button 
                        type="submit" 
                        className="btn btn-success"
                        onClick={() => {
                        setShow(!show)
                        }}>Understand
                        </button>
                        {/* <button 
                        type="button" 
                        className="btn btn-danger"
                        >Delete</button> */}
                    </div>
                </div>
                </div>
            </div>
            </>
        )
    }

    async function fetchSoal() {
        const response = await fetch(`/api/soal/${idSoal}`)
        if (response.status == 200) {
            const dataSoal = await response.json()
            setSoal(dataSoal.data)
        } else {
            setSoal(null)
        }
    }

    useEffect(() => {
        let isCancelled = false;

        if (!isCancelled){
        fetchSoal()
        setLoading(!isLoading)
        }

        return () => {
        isCancelled = true;
        }
    },[])

    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData()
        const fileName = Date.now().toString() + fileUpload.name
        formData.append("file", fileUpload, fileName)
        formData.append("idSoal", idSoal)
        formData.append("fileName", fileName)

        const endpoint = '/api/jawaban'

        const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        }

        const response = await axios.post(endpoint, formData, options)

        alert(response.data.message)
        if(response.data.message == 'success') {
            router.push('/peserta/')
        }
    }

    if(!isLoading) return <h3>Loading... Wait a bit</h3>
    if(!soal){ return <h3>Loading... Wait a bit, get data soal</h3>}

    return(
        <>
        <div className="container mt-5">
            <Modal/>
        <div>
            <h3>{soal.fileName}</h3>
            <div className="h5 mb-3 text-premier">
            {soal.namaDosen}
            </div>
            <div className="h5 pb-2 mb-4 text-premier border-bottom border-premier">
            NIDN {soal.nidn}
            </div>
        </div>
        <div className="row">
            <div className="col">
                <embed src={`/uploads/${soal.fileName}`} width="800px" height="1000px" />
            </div>
            <div className="col-3">
                <div className="card"
                style={{
                    'cursor': 'pointer'
                }}>
                    <form onSubmit={onSubmit}>
                    <div className="h4 pb-2 mb-4 text-premier border-bottom border-premier">
                    {soal.topik}
                    </div>
                    <div className="h6 pb-2 mb-4 text-premier">
                    {soal.sks} SKS
                    </div>
                    <div className="h6 pb-2 mb-4 text-premier">
                    Matakuliah {soal.matakuliah}
                    </div>
                    <div className="h6 pb-2 mb-4 text-premier">
                    Tanggal {soal.tanggal}
                    </div>
                    <div className="h6 pb-2 mb-4 text-premier border-bottom border-premier">
                    Batas Waktu {soal.batasWaktu}m
                    </div>
                    <div 
                    className="FileInput text-center align-content-center"
                    style={{
                        'border': '2px dashed grey',
                        'width': '100%',
                        'height': '50px',
                        'position': 'relative'
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
                            // 'lineHeight': '80px',
                            // 'position': 'absolute',
                            // 'background': 'red',
                            'width': '100%',
                            'justifySelf':'center',
                            // 'justifyContent': 'center',
                            'cursor': 'pointer'
                        }}
                        >Drag your files here or click in this area.</p>
                    </div>
                    <button className="btn btn-success mt-5" width="100%">Upload Result</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

ExamPage.getLayout = function getLayout(page) {
    return page
}