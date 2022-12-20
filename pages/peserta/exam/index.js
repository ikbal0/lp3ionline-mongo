export default function ExamPage(params) {

    return(
        <>
        <div className="container mt-5">
        <div>
            <h3>File Name</h3>
            <div className="h5 mb-3 text-premier">
            Dosen
            </div>
            <div className="h5 pb-2 mb-4 text-premier border-bottom border-premier">
            NIDN
            </div>
        </div>
        <div className="row">
            <div className="col">
                <embed src="/uploads/Ikbal Yaduar Taupik.pdf" width="800px" height="1000px" />
            </div>
            <div className="col-3">
                <div className="card">
                    <div className="h4 pb-2 mb-4 text-premier border-bottom border-premier">
                    Topik
                    </div>
                    <div className="h6 pb-2 mb-4 text-premier">
                    4 SKS
                    </div>
                    <div className="h6 pb-2 mb-4 text-premier">
                    Matakuliah
                    </div>
                    <div className="h6 pb-2 mb-4 text-premier">
                    Tanggal
                    </div>
                    <div className="h6 pb-2 mb-4 text-premier border-bottom border-premier">
                    Batas Waktu 200m
                    </div>
                    <div 
                    className="FileInput text-center align-content-center"
                    style={{
                        'border': '2px dashed grey',
                        'width': '100%',
                        'height': '50px',
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
                            // 'lineHeight': '80px',
                            // 'position': 'absolute',
                            // 'background': 'red',
                            'width': '100%',
                            'justifySelf':'center'
                            // 'justifyContent': 'center',
                        }}
                        >Drag your files here or click in this area.</p>
                    </div>
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