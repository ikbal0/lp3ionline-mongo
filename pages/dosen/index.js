import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getSession, signOut } from "next-auth/react"

export default function DashboardPage(){
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let today = new Date()
  let date = today.getFullYear()+'-'+months[today.getMonth()]+'-'+today.getDate()
  console.log(months[today.getMonth()])

  function SideNav(){
    return(
      <div class="col-xl-2 " style={{backgroundColor:'#00426D' ,paddingLeft:30, paddingTop:30}}>
        <ul class="nav flex-column ">
          <li class="nav-item">
            
          </li>
          <li class="nav-item">
            <Link href="/dosen/profil">
              <a class="nav-link text-white">
                <svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm.05 10H4.77c.99-.5 2.7-1 4.23-1 .11 0 .23.01.34.01.34-.73.93-1.33 1.64-1.81-.73-.13-1.42-.2-1.98-.2-2.34 0-7 1.17-7 3.5V19h7v-1.5c0-.17.02-.34.05-.5zm7.45-2.5c-1.84 0-5.5 1.01-5.5 3V19h11v-1.5c0-1.99-3.66-3-5.5-3zm1.21-1.82c.76-.43 1.29-1.24 1.29-2.18C19 9.12 17.88 8 16.5 8S14 9.12 14 10.5c0 .94.53 1.75 1.29 2.18.36.2.77.32 1.21.32s.85-.12 1.21-.32z"/></svg>
                Dosen
              </a>
            </Link>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              Mahasiswa
            </a>
          </li>
          <li class="nav-item">
            <Link href="dosen/record">
              <a class="nav-link text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} enable-background="new 0 0 24 24" height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><path d="M15,3H5C3.9,3,3.01,3.9,3.01,5L3,19c0,1.1,0.89,2,1.99,2H19c1.1,0,2-0.9,2-2V9L15,3z M5,19V5h9v5h5v9H5z M9,8 c0,0.55-0.45,1-1,1S7,8.55,7,8s0.45-1,1-1S9,7.45,9,8z M9,12c0,0.55-0.45,1-1,1s-1-0.45-1-1s0.45-1,1-1S9,11.45,9,12z M9,16 c0,0.55-0.45,1-1,1s-1-0.45-1-1s0.45-1,1-1S9,15.45,9,16z"/></g></g></svg>
                  Record
              </a>
            </Link>
          </li>
          <li class="nav-item">
            <Link href="dosen/soal">
            <a class="nav-link text-white active" aria-current="page"><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} enable-background="new 0 0 24 24" height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><g><rect fill="none" height="24" width="24"/><path d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,18L4,18V6h5.17 l2,2H20V18z M18,12H6v-2h12V12z M14,16H6v-2h8V16z"/></g></svg>Soal</a>
            </Link>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" aria-current="page" href="#"><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>Jawaban</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" aria-current="page" href="#"><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}}  height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm5.56 10.46l5.93-5.93-1.06-1.06-4.87 4.87-2.11-2.11-1.06 1.06z"/></svg>Kalender</a>
          </li>
          <li class="nav-item">
            <Link  href="dosen/kelas-online">
              <a class="nav-link text-white" aria-current="page"><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z"/></svg>
                Kelas online
              </a>
            </Link>
          </li>
          <li class="nav-item">
            <Link  href="dosen/kelas-online">
              <a 
              class="nav-link text-white" 
              aria-current="page"
              onClick={(e) => {
                signOut()
              }}><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z"/></svg>
                Log Out
              </a>
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  return(
    <>
      <Head>
        <title>Dosen</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>

      <div className='overflow-hidden'>
        <div class="row" style={{backgroundColor:'#ededed'}}>
          <SideNav/>
          <div class="col">
            <div class="container" style={{paddingTop:20}}>

              <div class="card mb-3" >
                <div class="row g-0">

                  <div class="col">
                    <div class="card bg-dark text-white">
                      <Image 
                      src="/header-about.png" 
                      width="2694" 
                      height="708" 
                      class="card-img" 
                      alt="..."/>
                      <div class="card-img-overlay">
                        <h5 class="card-title">Nama Dosen</h5>
                        <p class="card-text col-md-7">Anda adalah orang yang luar biasa. Keberadaan Anda di sini selalu memberikan kesempatan untuk untuk belajar. Kami menyambut Anda dengan hangat untuk berbagi dengan kami.</p>
                        <br/>
                        <p class="card-text">you was online 30 mins ago</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div class="card mb-3" >
                <div class="row g-0">
                  
                  <div class="col-md-4">
                    <Image src="/bg.jpg" width="290" height="200"/>
                  </div>

                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">Ujian Tengah Semester</h5>
                      <br/>
                      <br/>
                      <br/>
                      <p class="card-text"><small class="text-muted">12/15 peserta telah mngumpulkan jawaban</small></p>
                      <div class="progress">
                        <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: '80%'}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="card mb-3" style={{maxWidth: '18rem', maxHeight:'14rem', minHeight:'14rem'}}>
                    <div class="card-body text-dark">
                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="60px" viewBox="0 0 24 24" width="60px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><path d="M12,14v-1h1.5v0.5h2v-1H13c-0.55,0-1-0.45-1-1V10c0-0.55,0.45-1,1-1h3c0.55,0,1,0.45,1,1v1h-1.5v-0.5h-2v1H16 c0.55,0,1,0.45,1,1V14c0,0.55-0.45,1-1,1h-3C12.45,15,12,14.55,12,14z M9,9v4.5H7.5v-1H6v1C6,14.33,6.67,15,7.5,15H9 c0.83,0,1.5-0.67,1.5-1.5V9C10.5,9,9.83,9,9,9z"/></g></svg>
                      <h5>Functional Programming</h5>
                      <p class="card-text">Bab VI. Judul Bab.</p>
                      <hr/>
                      <div class="progress">
                        <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: '90%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="card mb-3" style={{maxWidth: '18rem', maxHeight:'14rem', minHeight:'14rem'}}>
                    <div class="card-body text-dark">
                      <p></p>
                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M18.85,10.39l1.06-1.06c0.78-0.78,0.78-2.05,0-2.83L18.5,5.09c-0.78-0.78-2.05-0.78-2.83,0l-1.06,1.06L18.85,10.39z M13.19,7.56L4,16.76V21h4.24l9.19-9.19L13.19,7.56z M19,17.5c0,2.19-2.54,3.5-5,3.5c-0.55,0-1-0.45-1-1s0.45-1,1-1 c1.54,0,3-0.73,3-1.5c0-0.47-0.48-0.87-1.23-1.2l1.48-1.48C18.32,15.45,19,16.29,19,17.5z M4.58,13.35C3.61,12.79,3,12.06,3,11 c0-1.8,1.89-2.63,3.56-3.36C7.59,7.18,9,6.56,9,6c0-0.41-0.78-1-2-1C5.74,5,5.2,5.61,5.17,5.64C4.82,6.05,4.19,6.1,3.77,5.76 C3.36,5.42,3.28,4.81,3.62,4.38C3.73,4.24,4.76,3,7,3c2.24,0,4,1.32,4,3c0,1.87-1.93,2.72-3.64,3.47C6.42,9.88,5,10.5,5,11 c0,0.31,0.43,0.6,1.07,0.86L4.58,13.35z"/></svg>
                      <h5 style={{paddingTop:'13px'}}>Web Design with Next js</h5>
                      <p class="card-text">Bab III. Judul Bab.</p>
                      <hr/>
                      <div class="progress">
                        <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: '40%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="card mb-3" style={{maxWidth: '18rem', maxHeight:'14rem', minHeight:'14rem'}}>
                    <div class="card-body text-dark">
                      <p></p>
                      <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z"/></svg>
                      <p></p><h5>Calulus</h5>
                      <br></br>
                      <p class="card-text">Bab V. Judul Bab.</p>
                      <hr/>
                      <div class="progress">
                        <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="card mb-3" style={{maxWidth: '18rem', maxHeight:'14rem', minHeight:'14rem'}}>
                    <div class="card-body text-dark">
                      <p></p>
                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M14,9v2h-3V9H8.5V7H11V1H4v6h2.5v2H4v6h2.5v2H4v6h7v-6H8.5v-2H11v-2h3v2h7V9H14z"/></svg>
                      <p></p>
                      <h5>Analysist</h5>
                      <br/>
                      <p class="card-text" style={{paddingTop:'5px'}}>Bab I. Judul Bab.</p>
                      <hr/>
                      <div class="progress">
                        <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width: '20%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div class="card-body">
                <h5 class="card-title">Ujian Tengah Semester</h5>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>

              <div class="card mb-3" >
                <div class="row g-0">
                  
                  <div class="col-md-4">
                    <Image src="/bg.jpg" width="290" height="200"/>
                  </div>

                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">Ujian Tengah Semester</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          <div class="col-3" style={{paddingTop:'20px'}}>
            <div class="card mb-3" style={{maxWidth: '22rem'}}>
            
              <div class="card-body text-center" style={{color:'#003152'}}>
                <div class="row">
                  <div class="col">
                    <h2 class="card-title">{today.getDate()}</h2>
                    <h6>{months[today.getMonth()]+' '+today.getFullYear()}</h6>
                  </div>
                  <div class="col">
                    <h2 style={{paddingTop:'10px'}}>{today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()}</h2>
                  </div>  
                </div>
              </div>
            </div>
            
            <div class="card mb-3" style={{maxWidth: '22rem'}}>
              <div class="row g-0">
                <div class="col-md-4 text-center text-light" style={{padding:'20px', backgroundColor:'#003152'}}>
                  <p class="fs-2">5th</p>
                  <small>In 3 mins</small>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Ujian Ke 3</h5>
                    <hr/>
                    <button type="button" class="btn btn-outline-secondary">Detail</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-3" style={{maxWidth: '22rem', borderColor:'#D8EBFA'}}>
              <div class="row g-0">
                <div class="col-md-4 text-center" style={{padding:'20px', backgroundColor:'#D8EBFA'}}>
                  <p class="fs-2" style={{color:'#003152'}}>8th</p>
                  <small>In 3 days</small>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Ujian Ke 4</h5>
                    <hr/>
                    <button type="button" class="btn btn-outline-secondary">Detail</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-3" style={{maxWidth: '22rem', borderColor:'#D8EBFA'}}>
              <div class="row g-0">
                <div class="col-md-4 text-center" style={{padding:'20px', backgroundColor:'#D8EBFA'}}>
                  <p class="fs-2" style={{color:'#003152'}}>9th</p>
                  <small>In 4 days</small>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Ujian Tengah Semester</h5>
                    <hr/>
                    <button type="button" class="btn btn-outline-secondary">Detail</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-3" style={{maxWidth: '22rem', borderColor:'#D8EBFA'}}>
              <div class="row g-0">
                <div class="col-md-4 text-center" style={{padding:'20px', backgroundColor:'#D8EBFA'}}>
                  <p class="fs-2" style={{color:'#003152'}}>14th</p>
                  <small>In 9 days</small>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Ujian Ke 5</h5>
                    <hr/>
                    <button type="button" class="btn btn-outline-secondary">Detail</button>
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
      </div>
    </>
  )
}

DashboardPage.getLayout = function getLayout(page) {
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