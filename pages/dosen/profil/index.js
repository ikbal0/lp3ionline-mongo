import Head from 'next/head'

export default function ProfileDosen({tblTest}){

    async function handleSubmit() {
        const data = {
            time: 'time'
        }

        const response = await fetch('/api/properties', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });
        
        const result = await response.json()

        console.log(result)
    }
    
    return(
        <>
            <div className='container'>
                <button onClick={handleSubmit}>Test</button>
            </div>
            {tblTest ?
            tblTest.map((f) => {
                return <p key={f._id}>{f.time} {f.status}</p>
            })
            :
            <p>Test Tbl not found</p>
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const header = context.req.headers;

    const response = await fetch('http://localhost:3000/api/properties', {
        headers: {
            Cookie: header.cookie
        }
    })
    if(response.status == 200){
        const data = await response.json()
      
        return {
            props: {
                tblTest: data.data,
            }
        }
    } else {
        return {
            props: {
                tblTest: null,
            }
        }
    }
  }