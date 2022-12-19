import SideNav from "../../../lib/dosen/SideNav";

export default function JawabanPage() {
    return <div className="overflow-hidden" style={{
            // 'background': ' #d1d1d1',
            'height': '100vh'
        }}>
        <div className="row">
            <div className="col-2 ms-3 mt-3" style={{
                'height': '100vh'
            }}>
                <SideNav/>
            </div>
            <div className="col">
                <div className="row mt-3 me-3">
                    <div className="card p-3 text-center mb-3" style={{
                        'borderBlockColor': 'white'
                    }}>
                        <p className="">Test</p>
                    </div>
                    <div className="col-4">
                        <div className="card p-3 text-center">
                            <p className="">Test</p>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card p-3 text-center">
                            <p className="">Test</p>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card p-3 text-center">
                            <p className="">Test</p>
                        </div>
                    </div>
                    <div className="card p-3 mt-3 text-center">
                        <div className="row me-3">
                            <div className="col-12 mb-3"> 
                                <div className="card p-3 mt-3 text-center" style={{
                                    'background': '#00426D'
                                }}>
                                    <p className="text-light">Test</p>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card p-3 text-center">
                                    <p className="">Test</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="card p-3 text-center" style={{
                                    'background': '#00426D'
                                }}>
                                    <p className="text-light">Test</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

JawabanPage.getLayout = function getLayout(page) {
    return page
}