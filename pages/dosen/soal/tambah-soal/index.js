import Link from "next/link";
import Head from "next/head";
import { Check2All, Clipboard2Minus, FiletypePdf, JustifyRight } from "react-bootstrap-icons";
import { useState } from "react";
import style from "../../../../styles/Soal.module.css"
import SideNav from "../../../../lib/dosen/SideNav";
import { getSession } from "next-auth/react"

export default function TambahSoal(){
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    let today = new Date()
    let date = today.getFullYear()+'-'+months[today.getMonth()]+'-'+today.getDate()
    console.log(months[today.getMonth()])

    function MyCarousel() {
        return (
            <div className="p-5 text-light" style={{backgroundColor:'#00426D'}}>
                <h1 className="text-light">Tambah Soal</h1>
                <p>Masukan data soal</p>
                <div className="row">
                    <div className="col-sm-12">
                    <h4 className="text-light">
                        <Link href="/dosen/soal">
                            <a className="text-warning"
                            style={{
                                'color': 'white'
                            }}
                            >Soal</a> 
                        </Link>
                        {' >'}
                        Tambah soal
                    </h4>
                    </div>
                    <div className="col-sm-12">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link href={'/dosen/soal/tambah-soal/upload/'}>
                        <a className="btn btn-warning" type="button">
                            <FiletypePdf/>
                            {' Upload'}
                        </a>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    function AddQuiz() {
        return (
        <>
            <div className={`card mb-3`}>
                <div className="card-header">
                    Pilihan Ganda
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <small>pilihan ganda adalah model soal yang terdiri dari dua bagian utama yaitu pada pokok soal dan pilihan jawaban yang memiliki empat variasi dari bentuk model jawaban pilihan ganda yang memunkinkan siswa bisa menjawab pertanyaan pilihan lebih dari satu.</small>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-warning"><Check2All/> Create</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header">
                    Jawaban Singkat
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <small>jawaban singkat adalah soal yang menuntut peserta tes untuk memberikan jawaban singkat berupa kata, prase, nama tempat, nama tokoh, lambang, atau kalimat yang sudah pasti (Sumarna, 2007).</small>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-warning"><Clipboard2Minus/> Create</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header">
                    Essay
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <small>merupakan pertanyaan yang menuntut siswa menjawabnya dalam bentuk menguraikan, menjelaskan, mendiskusikan, membandingkan, memberi alasan, dan bentuk lain yang sejenis sesuai dengan tuntutan pertanyaan dengan menggunakan kata-kata dan bahasa sendiri.</small>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-warning"><JustifyRight/> Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }

    function CollapseNav(params) {
        const [show, setShow] = useState(false)
        return (
            <div>
                <div 
                style={{
                    'width': '100%'
                }}>
                    <nav className={`navbar navbar-light bg-light ${style.grid2}`}>
                        <div className="container-fluid">
                            <button 
                            onClick={() => setShow(!show)}
                            className="navbar-toggler" 
                            type="button" >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </nav>
                    <div className={`collapse ${show ? 'show' : 'd-none'}`} id="navbarToggleExternalContent">
                        <div className="bg-light p-4">
                            <div>
                            <h5 className="h4">Navigation</h5>
                            <SideNav/>
                            </div>
                        </div>
                    </div>
                </div>
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
            {/* Collapse Nav */}
            <CollapseNav/>
            <div className="overflow-hidden">
                <div 
                className="row" 
                style={{
                    // 'height': '100vh'
                }}>
                    {/* Side Nav */}
                    <div 
                        style={{
                            'position': 'relative'
                        }} 
                        className={`col-lg-3 col-md-5 ${style.grid1}`}
                    >
                        <SideNav/>
                    </div>
                    <div className="col">
                        <div className="container-md pt-3">
                            <AddQuiz/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

TambahSoal.getLayout = function getLayout(page) {
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
  
    return {
      props: {
        session,
      }
    }
}