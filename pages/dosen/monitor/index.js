import Head from 'next/head'
import Image from 'next/image'

export default function DashboardPage(){
  return(
    <>
      <Head>
        <title>Monitoring</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>

        <div class="container-fluid">
            <div class="row bg-dark">
                <div class="col">col-8</div>
            </div>
            
            <div class="row">
                <div class="col-10" style={{padding:'10px'}}>
                    <div class="row">
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                        <div class="col">
                            <Image src="/1.png" height="260px" width="388px"></Image>
                        </div>
                    </div>
                </div>
                
                <div class="col-2 bg-dark" style={{color:'white', padding:'20px'}}>
                    Partisipan
                    <hr/>
                    <div class="row" style={{paddingBottom:10}}>
                        <div class="col">
                            <input class="form-control bg-dark" style={{color:'white'}} type="text" placeholder="Cari.." aria-label="default input example"/>
                        </div>
                    </div>
                    <div class="container-fluid" style={{height:'100px', overflow:'auto'}}>
                    <ul style={{listStyleType:'none', padding:'17px'}}>
                        <li>Shaun Easton</li>
                        <li>Rodrigo Hickman</li>
                        <li>Falak Martinez</li>
                        <li>Rajan Riggs</li>
                        <li>Gladys Lott</li>
                        <li>Gene Torres</li>
                        <li>Lillie-Mai Connor</li>
                        <li>Fraser Robson</li>
                        <li>Alena Cartwright</li>
                        <li>Mehmet Hughes</li>
                    </ul>
                    </div>
                    <hr/>
                    <ul class="nav flex-column ">
                        <li class="nav-item">
                        <h4>Menu</h4>
                        <hr/>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link text-light" href='#'>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm.05 10H4.77c.99-.5 2.7-1 4.23-1 .11 0 .23.01.34.01.34-.73.93-1.33 1.64-1.81-.73-.13-1.42-.2-1.98-.2-2.34 0-7 1.17-7 3.5V19h7v-1.5c0-.17.02-.34.05-.5zm7.45-2.5c-1.84 0-5.5 1.01-5.5 3V19h11v-1.5c0-1.99-3.66-3-5.5-3zm1.21-1.82c.76-.43 1.29-1.24 1.29-2.18C19 9.12 17.88 8 16.5 8S14 9.12 14 10.5c0 .94.53 1.75 1.29 2.18.36.2.77.32 1.21.32s.85-.12 1.21-.32z"/></svg>
                            Dosen
                        </a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link text-light" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                            Mahasiswa
                        </a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link text-light" href="#"><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} enable-background="new 0 0 24 24" height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><path d="M15,3H5C3.9,3,3.01,3.9,3.01,5L3,19c0,1.1,0.89,2,1.99,2H19c1.1,0,2-0.9,2-2V9L15,3z M5,19V5h9v5h5v9H5z M9,8 c0,0.55-0.45,1-1,1S7,8.55,7,8s0.45-1,1-1S9,7.45,9,8z M9,12c0,0.55-0.45,1-1,1s-1-0.45-1-1s0.45-1,1-1S9,11.45,9,12z M9,16 c0,0.55-0.45,1-1,1s-1-0.45-1-1s0.45-1,1-1S9,15.45,9,16z"/></g></g></svg>Record</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link text-light" aria-current="page" href="#"><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} enable-background="new 0 0 24 24" height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><g><rect fill="none" height="24" width="24"/><path d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,18L4,18V6h5.17 l2,2H20V18z M18,12H6v-2h12V12z M14,16H6v-2h8V16z"/></g></svg>Soal</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link text-light" aria-current="page" href="#"><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}} height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>Jawaban</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link text-light" aria-current="page" href="#"><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:5, paddingRight:10}}  height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm5.56 10.46l5.93-5.93-1.06-1.06-4.87 4.87-2.11-2.11-1.06 1.06z"/></svg>Kalender</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="row bg-dark">
                <div class="col">col-8</div>
            </div>
        </div>
    </>
  )
}