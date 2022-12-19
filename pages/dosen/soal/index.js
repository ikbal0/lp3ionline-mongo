import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SideNav from '../../../lib/dosen/SideNav'
import {getSession} from 'next-auth/react';
import { useFormik } from "formik";
import { sola_validate } from '../../../lib/validate'
import axios from 'axios'

export default function SoalPage({kelas}){
  const [fileUpload, setFile] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState({
    topik: '',
    kelasId: '',
    tanggal: '',
    batasWaktu: ''
  })
  const [data, setData] = useState({
    soal: null
  })

  async function fetchSoal() {
    const response = await fetch('/api/dosen/soal')
    if (response.status == 200) {
      const dataSoal = await response.json()
      setData({
        ...data,
        soal: dataSoal.dataSoal
      })
    } else {
      setData({
        ...data,
        soal: null
      })
    }
  }

  function closeModal(params) {
    fetchSoal()
    setShow(!show)
    setModalData({
      topik: '',
      kelasId: '',
      tanggal: '',
      batasWaktu: ''
    })
    setFile(null)
  }
  
  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled){
      fetchSoal()
      setLoading(false)
    }

    return () => {
      isCancelled = true;
    }
  }, [])

  function Nav() {
    return (
      <div className="row row-cols-2" style={{paddingTop: 10, paddingRight: 20, paddingBottom:10}}>
        <div className="col" style={{color:'black', paddingTop: 10, paddingLeft: 40}}>
          <Image src="/lp3i.png" alt="Lp3i Logo" width={180} height={90} />
        </div>
        <div className="col">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className="nav-link text-dark" aria-current="page" href="#">Active</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Log out</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  async function handleClickDelete(event) {
    if (confirm("Are you sure want to process?") == true) {
      const response = await fetch(`/api/dosen/soal/${event}`, { method: 'DELETE'})
      if(response.status == '204'){
        alert('delete success')
        closeModal()
      }
    } else {
      alert('delete canceled')
    }
  }

  function ModalSoal(props) {
    const formik = useFormik({
      initialValues: {
        topik: modalData.topik,
        kelasId: modalData.kelasId,
        tanggal: modalData.tanggal,
        batasWaktu: modalData.batasWaktu
      },
      validate: sola_validate,
      onSubmit
    })
  
    async function onSubmit(values) {
      const formData = new FormData()
  
      formData.append("topik", values.topik)
      formData.append("kelasId", values.kelasId)
      formData.append("tanggal", values.tanggal)
      formData.append("batasWaktu", values.batasWaktu)

      if(fileUpload) {
        const fileName = Date.now().toString() + 'update' + fileUpload.name
        formData.append("file", fileUpload, fileName)
        formData.append("fileName", fileName)
      } else {
        formData.append("fileName", modalData.fileName)
      }
  
      const endpoint = `/api/soal/${modalData._id}`
  
      const options = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
  
      const response = await axios.put(endpoint, formData, options)
  
      if(response.data.message == 'success') {
        alert(response.data.message)
        closeModal()
      } else {
        alert('something wrong!')
        closeModal()
      }
    }

    return <div>
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
                setModalData({
                  topik: '',
                  kelasId: '',
                  tanggal: '',
                  batasWaktu: ''
                })
              }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="modal-body">
                {modalData ? <div>
                  <div className="col-12 mb-3">
                    <label className="form-label">Topik</label>
                    <input 
                    type="text" 
                    className="form-control"
                    name="topik"
                    defaultValue={modalData.topik}
                    {...formik.getFieldProps('topik')}
                    />
                    {formik.errors.topik && formik.touched.topik ? 
                    <span className="text-danger">{formik.errors.topik}</span>
                    :<p className="card-text"><small className="text-muted">Masukan judul untuk lembar soal</small></p>
                    }
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">batas waktu</label>
                    <input 
                    type="text" 
                    className="form-control"
                    name="batasWaktu"
                    defaultValue={modalData.batasWaktu}
                    {...formik.getFieldProps('batasWaktu')}
                    />
                    {formik.errors.batasWaktu && formik.touched.batasWaktu ? 
                    <span className="text-danger">{formik.errors.batasWaktu}</span>
                    :<p className="card-text"><small className="text-muted">Masukan Batas waktu pengerjaan soal dalam format menit</small></p>
                    }
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">tanggal</label>
                    <input 
                    type="datetime-local" 
                    className="form-control" 
                    id="inputJudul" 
                    name="tanggal"
                    defaultValue={modalData.tanggal}
                    {...formik.getFieldProps('tanggal')}
                    />
                    {formik.errors.tanggal && formik.touched.tanggal ? 
                    <span className="text-danger">{formik.errors.tanggal}</span>
                    :<p className="card-text"><small className="text-muted">Kapan soal akan di kerjakan</small></p>
                    }
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">Kelas</label>
                    {!kelas ? 
                    <p>Loading kelas...</p>
                    :
                    <select 
                    className="form-select"
                    name="kelasId"
                    defaultValue={modalData.kelasId}
                    {...formik.getFieldProps('kelasId')}
                    >
                        {
                            kelas.map((f) => {
                                return <option key={f._id} value={f._id}>{f.kelas}</option>
                            })
                        }
                    </select>
                    }    
                    {formik.errors.kelasId && formik.touched.kelasId ? 
                    <span className="text-danger">{formik.errors.kelasId}</span>
                    :<p className="card-text"><small className="text-muted">Pilih Kelas</small></p>
                    }                
                  </div>
                  <div className="col-12">
                    <label className="form-label">file</label>
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
                      >{fileUpload ? fileUpload.name : modalData.fileName}</p>
                    </div>
                </div>
                </div> : <p>Loading...</p>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                  closeModal()
                }}>Close</button>
                <button type="submit" className="btn btn-success">Save changes</button>
                <button 
                type="button" 
                className="btn btn-danger"
                onClick={() => {
                  if(!modalData){
                    alert('loading...')
                  } else {
                    handleClickDelete(modalData._id)
                  }
                }}
                >Delete</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  }

  async function handleClick(event) {
    const response = await fetch(`/api/dosen/soal/${event}`)
    if (response.status == 200) {
      const dataSoal = await response.json()
      setModalData(dataSoal.dataSoal)
    } else {
      setModalData({
        topik: '',
        kelasId: '',
        tanggal: '',
        batasWaktu: ''
      })
    }
  }

  function SecondNav(params) {
    return(
      <div className="row" style={{backgroundColor:'#00426D', padding:20}}>
        <div className="col-xl-2 ">
          <Image src="/avatar.png" height="200px" width="200px" style={{borderRadius:'50%'}} />
        </div>

        <div className="col">
          <nav className="navbar navbar-light" style={{paddingLeft:8}}>
            <a className="navbar-brand text-light" href="#" style={{fontSize:20}}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} enableBackground="new 0 0 24 24" height="40px" viewBox="0 0 24 24" width="40px" fill="#ffffff"><g><rect fill="none" height="24" width="24"/><path d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,18L4,18V6h5.17 l2,2H20V18z M18,12H6v-2h12V12z M14,16H6v-2h8V16z"/></g></svg>
              Soal            
            </a>
          </nav>

          <div className="row border-bottom" style={{paddingBottom:'10px'}}>
            <div className="col-2">
              <div style={{paddingBottom: 10, paddingLeft:10}}>
                <Link href="/dosen/soal/tambah-soal">
                  <a className="btn btn-success" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Tambah Soal
                  </a>
                </Link>
              </div>
            </div>
            <div className="col">
              <div style={{paddingBottom: 10, paddingLeft:10}}>
                <input className="form-control" type="text" placeholder="Cari.." aria-label="default input example"/>
              </div>              
            </div>
            <div className="col-1">
            <button className="btn btn-success" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
              </button>
            </div>
          </div>
          <a className="btn dropdown-toggle" style={{fontSize:20, color:'white'}}>
            Filter 
          </a>
          <p style={{color: '#cfcfcf',fontStyle: 'italic', fontSize:13,}}>
            Keterangan Tambahan dan lainnya..
          </p>
        </div>
      </div>
    )
  }

  function TableSoal(params) {
    if(isLoading) {
      return <h3>Wait a moment, Loading... getting data </h3>
    }
    if(!data.soal){
      return <h3>Wait a moment, Loading... getting data soal</h3>
    }
    return <div className='table-responsive'>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Topik</th>
            <th scope="col">Tanggal</th>
            <th scope="col">Kelas</th>
            <th scope="col">Batas Waktu</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.soal.map((f, i) => {
              return <tr style={{'cursor': 'pointer'}} key={i}>
                <td>{f.topik}</td>
                <td>{f.tanggal}</td>
                <td>{f.kelas}</td>
                <td>{f.batasWaktu} Menit</td>
                <td>
                  <a onClick={() =>{
                    handleClick(f._id)
                    setShow(!show)
                    }}>Go</a>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  }

  function Footer(params) {
    return (
      <div className="bg-dark">
        <footer className="d-flex flex-wrap justify-content-between align-items-center " style={{padding:30}}>
          <div className="col-md-4 d-flex align-items-center">
            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <img src="https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt=""/>
            </a>
            <span className="text-muted">© 2021 Company, Inc</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-muted" href="#">   
                <svg className="svg" width="30" height="30" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg"><path d="M5.66 15.616c6.793 0 10.508-5.624 10.508-10.5 0-.16 0-.32-.01-.478.722-.522 1.346-1.169 1.842-1.91-.674.299-1.389.494-2.121.58.77-.46 1.348-1.186 1.624-2.04-.725.43-1.518.732-2.346.895-.556-.591-1.293-.983-2.095-1.114-.802-.132-1.625.005-2.341.388-.717.383-1.287.992-1.623 1.732-.336.74-.418 1.569-.234 2.36-1.468-.073-2.905-.455-4.216-1.119-1.311-.664-2.468-1.597-3.395-2.737-.472.813-.617 1.775-.405 2.69.213.915.766 1.715 1.548 2.237-.588-.018-1.162-.176-1.676-.462v.047c0 .852.295 1.677.835 2.337.54.66 1.292 1.112 2.128 1.28-.544.149-1.114.17-1.668.064.236.733.696 1.374 1.314 1.834.619.46 1.366.714 2.137.729-1.308 1.027-2.924 1.584-4.587 1.582-.294 0-.587-.018-.879-.053 1.689 1.083 3.654 1.658 5.66 1.655" fillRule="nonzero" fillOpacity="1" fill="#ffffff" stroke="none"></path></svg>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="#">
                <svg className="svg" width="30" height="30" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M.883 0h14.234c.488 0 .883.395.883.883v14.234c0 .488-.395.883-.883.883H.883C.395 16 0 15.605 0 15.117V.883C0 .395.395 0 .883 0zM11.04 9.804V16H8.546V9.806H6.461V7.39h2.085v-1.78c0-2.067 1.262-3.192 3.107-3.192.622-.003 1.244.03 1.863.095v2.158h-1.277c-1.005 0-1.2.476-1.2 1.176v1.54h2.392l-.31 2.416H11.04z" fillRule="evenodd" fillOpacity="1" fill="#ffffff" stroke="none"></path></svg>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    )
  }
  return(
    <>
      <Head>
        <title>Soal</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <div className='overflow-hidden'>
        <Nav/>
        <SecondNav/>
        <ModalSoal/>
        <div className="row">
          <div className="col-xl-2">
            <SideNav/>
          </div>
          <div className="col">
            <TableSoal/>
          </div>      
        </div>
        <Footer/>
      </div>
    </>
  )
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