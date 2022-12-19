import {getSession} from 'next-auth/react';

export default function Peserta() {
    return (
        <h3>Peserta</h3>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (session){
        if(session.level == '1'){
            return {
                redirect: {
                    permanent: false,
                    destination: "/peserta"
                }
            }
        } else if(session.level == '2'){
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
    }
    return {
        props: {
            session: session,
        },
    }
}