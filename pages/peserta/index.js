import {getSession} from 'next-auth/react';
import Link from 'next/link'
import Image from 'next/image'
import PesertaSideNav from '../../lib/peserta/PesertaSideNav';
import { useEffect, useState } from 'react';

function TopNav(params) {
    return(
      <div className="row" style={{backgroundColor:'#00426D', padding:20, marginRight: '8px'}}>
        <h3 className='text-light'>Up coming exam</h3>
      </div>
    )
}


function Table () {
    const [soal, setSoal] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
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
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button onClick={() => {
                        setShow(!show)
                    }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                        setShow(!show)
                        }}>Close</button>
                        <button type="submit" className="btn btn-success">Understand</button>
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
        const response = await fetch('/api/peserta/soal/')
        if (response.status == 200) {
            const dataSoal = await response.json()
            setSoal(dataSoal.data)
        } else {
            setSoal(null)
        }
    }

    if(!isLoading) return <h3>Loading... Wait a bit</h3>
    if(!soal) return <h3>Loading... Wait a bit, get data soal</h3>

    return(
        <>
        <div>
            <Modal/>
            <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">Topik</th>
                <th scope="col">Dosen</th>
                <th scope="col">Matakuliah</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Kerjakan</th>
                <th scope="col">Batas Waktu</th>
                </tr>
            </thead>
            <tbody>
                {
                    soal.map((f, index) =>{
                        return <tr key={index}>
                            <td>{f.topik}</td>
                            <td>{f.namaDosen}</td>
                            <td>{f.matakuliah}</td>
                            <td>{f.tanggal}</td>
                            <td>
                                <button 
                                className='btn btn-success'
                                onClick={() => {
                                    setShow(!show)
                                }}>Go</button>
                            </td>
                            <td>{f.batasWaktu}</td>
                        </tr>
                    })
                }
            </tbody>
            </table>
        </div>
        </>
    )
}

export default function Peserta() {
    return (<>
        <div className='overflow-hidden'>
            <div className='row'>
                <div className='col-lg-2 ms-2 mt-2'>
                    <PesertaSideNav/>
                </div>
                <div className='col'>
                    <TopNav/>
                    <h3>Peserta</h3>
                    <Table/>
                </div>
            </div>
        </div>
    </>
    )
}

Peserta.getLayout = function getLayout(page) {
    return page
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (session){
        if(session.level == '2'){
            return {
                redirect: {
                    permanent: false,
                    destination: "/dosen"
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
    return {
        props: {
            session: session,
        },
    }
}