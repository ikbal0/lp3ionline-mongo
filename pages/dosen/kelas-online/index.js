import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function KelasPage(){
  return(
    <>
      <Head>
        <title>Kelas Online</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>

      <div class="row row-cols-2" style={{paddingTop: 10, paddingRight: 20, paddingBottom:10}}>
        <div class="col" style={{color:'black', paddingTop: 10, paddingLeft: 40}}>
          <Image src="/lp3i.png" alt="Lp3i Logo" width={180} height={90} />
        </div>
        <div class="col">
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <a class="nav-link text-dark" aria-current="page" href="#">Active</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Log out</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="row" style={{backgroundColor:'#002b8f', padding:20}}>
        <div class="col-xl-2 ">
           <Image src="/avatar.png" height="200px" width="200px" style={{borderRadius:'50%'}} />
        </div>

        <div class="col">
          <nav class="navbar navbar-light" style={{paddingLeft:8}}>
            <a class="navbar-brand text-light" href="#" style={{fontSize:20}}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="40px" viewBox="0 0 24 24" width="40px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z"/></svg>
              Kelas Online            
            </a>
          </nav>

          <div class="row border-bottom" style={{paddingBottom:'10px'}}>
            <div class="col-2">
              <div style={{paddingBottom: 10, paddingLeft:10}}>
                <Link href="/dosen/kelas-online/tambah-kelas">
                    <a class="btn btn-success" type="button" id="dropdownMenuButton1" aria-expanded="false">
                        Tambah Kelas
                    </a>
                </Link>
              </div>
            </div>
            <div class="col">
              <div style={{paddingBottom: 10, paddingLeft:10}}>
                <input class="form-control" type="text" placeholder="Cari.." aria-label="default input example"/>
              </div>              
            </div>
            <div class="col-1">
            <button class="btn btn-success" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
              </button>
            </div>
          </div>
          <a class="btn dropdown-toggle" style={{fontSize:20, color:'white'}}>
            Filter 
          </a>
          <p style={{color: '#cfcfcf',fontStyle: 'italic', fontSize:13,}}>
            Keterangan Tambahan dan lainnya..
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-2 " style={{backgroundColor:'#f7f8ff' ,paddingLeft:30, paddingTop:30}}>
          <ul class="nav flex-column ">
            <li class="nav-item">
              <h3>Nama Dosen</h3>
              <hr/>
            </li>
            <li class="nav-item">
              <Link href="/dosen">
                <a class="nav-link text-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"/></svg>
                  Dashboard
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm.05 10H4.77c.99-.5 2.7-1 4.23-1 .11 0 .23.01.34.01.34-.73.93-1.33 1.64-1.81-.73-.13-1.42-.2-1.98-.2-2.34 0-7 1.17-7 3.5V19h7v-1.5c0-.17.02-.34.05-.5zm7.45-2.5c-1.84 0-5.5 1.01-5.5 3V19h11v-1.5c0-1.99-3.66-3-5.5-3zm1.21-1.82c.76-.43 1.29-1.24 1.29-2.18C19 9.12 17.88 8 16.5 8S14 9.12 14 10.5c0 .94.53 1.75 1.29 2.18.36.2.77.32 1.21.32s.85-.12 1.21-.32z"/></svg>
                Dosen
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                Mahasiswa
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="#"><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} enable-background="new 0 0 24 24" height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><path d="M15,3H5C3.9,3,3.01,3.9,3.01,5L3,19c0,1.1,0.89,2,1.99,2H19c1.1,0,2-0.9,2-2V9L15,3z M5,19V5h9v5h5v9H5z M9,8 c0,0.55-0.45,1-1,1S7,8.55,7,8s0.45-1,1-1S9,7.45,9,8z M9,12c0,0.55-0.45,1-1,1s-1-0.45-1-1s0.45-1,1-1S9,11.45,9,12z M9,16 c0,0.55-0.45,1-1,1s-1-0.45-1-1s0.45-1,1-1S9,15.45,9,16z"/></g></g></svg>Record</a>
            </li>
            <li class="nav-item">
              <Link href="soal">
                <a class="nav-link text-dark active" aria-current="page"><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} enable-background="new 0 0 24 24" height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><g><rect fill="none" height="24" width="24"/><path d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,18L4,18V6h5.17 l2,2H20V18z M18,12H6v-2h12V12z M14,16H6v-2h8V16z"/></g></svg>
                    Soal
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" aria-current="page" href="#"><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>Jawaban</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" aria-current="page" href="#"><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}}  height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm5.56 10.46l5.93-5.93-1.06-1.06-4.87 4.87-2.11-2.11-1.06 1.06z"/></svg>Kalender</a>
            </li>
            <li class="nav-item">
              <Link href="kelas-online">
              <a class="nav-link active text-dark" aria-current="page"><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z"/></svg>
              Kelas online
              </a>
              </Link>
            </li>
          </ul>
        </div>

        <div class="col">
          <div class="container" style={{paddingTop:20}}>
            
            <div class="row" style={{paddingBottom:'20px'}}>
                <div class="col-sm-4">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
                </div>
            </div>

            <div class="row" style={{paddingBottom:'20px'}}>
                <div class="col-sm-4">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
                </div>
            </div>

            <div class="row" style={{paddingBottom:'20px'}}>
                <div class="col-sm-4">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
                </div>
            </div>

          </div>
        </div>      
      </div>

      <div class="bg-dark">
        <footer class="d-flex flex-wrap justify-content-between align-items-center " style={{padding:30}}>
          <div class="col-md-4 d-flex align-items-center">
            <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <img src="https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""/>
            </a>
            <span class="text-muted">© 2021 Company, Inc</span>
          </div>

          <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li class="ms-3">
              <a class="text-muted" href="#">   
                <svg class="svg" width="30" height="30" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg"><path d="M5.66 15.616c6.793 0 10.508-5.624 10.508-10.5 0-.16 0-.32-.01-.478.722-.522 1.346-1.169 1.842-1.91-.674.299-1.389.494-2.121.58.77-.46 1.348-1.186 1.624-2.04-.725.43-1.518.732-2.346.895-.556-.591-1.293-.983-2.095-1.114-.802-.132-1.625.005-2.341.388-.717.383-1.287.992-1.623 1.732-.336.74-.418 1.569-.234 2.36-1.468-.073-2.905-.455-4.216-1.119-1.311-.664-2.468-1.597-3.395-2.737-.472.813-.617 1.775-.405 2.69.213.915.766 1.715 1.548 2.237-.588-.018-1.162-.176-1.676-.462v.047c0 .852.295 1.677.835 2.337.54.66 1.292 1.112 2.128 1.28-.544.149-1.114.17-1.668.064.236.733.696 1.374 1.314 1.834.619.46 1.366.714 2.137.729-1.308 1.027-2.924 1.584-4.587 1.582-.294 0-.587-.018-.879-.053 1.689 1.083 3.654 1.658 5.66 1.655" fill-rule="nonzero" fill-opacity="1" fill="#ffffff" stroke="none"></path></svg>
              </a>
            </li>
            <li class="ms-3">
              <a class="text-muted" href="#">
                <svg class="svg" width="30" height="30" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M.883 0h14.234c.488 0 .883.395.883.883v14.234c0 .488-.395.883-.883.883H.883C.395 16 0 15.605 0 15.117V.883C0 .395.395 0 .883 0zM11.04 9.804V16H8.546V9.806H6.461V7.39h2.085v-1.78c0-2.067 1.262-3.192 3.107-3.192.622-.003 1.244.03 1.863.095v2.158h-1.277c-1.005 0-1.2.476-1.2 1.176v1.54h2.392l-.31 2.416H11.04z" fill-rule="evenodd" fill-opacity="1" fill="#ffffff" stroke="none"></path></svg>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  )
}