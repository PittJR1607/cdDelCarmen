import { useEffect, useState } from "react"
import { app } from "../firebaseConfig/firebaseConfig"
import { getDatabase, ref, onValue } from 'firebase/database'


function Reports() {
    const [tokens, setFichas] = useState(0);
    const [guests, setInvitados] = useState(0);
    const [users, setUsers] = useState({})

    const [auth, setAuth] = useState(false)
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const [ usuariosCsv, setUsuariosCsv ] = useState([])
    const [ reporteGeneral, setReporteGeneral ] = useState([])

    function handleAuth() {
        if (password === "CD_CarmenADIR") {
            setAuth(true)
            setMsg('')
        }
        else {
            setMsg("Clave de Acceso Incorrecta")
        }
    }


    function generateCSV(data, title) {
        const csvContent = "data:text/csv;charset=utf-8," + data.join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${title}.csv`);
        document.body.appendChild(link);
        link.click();
    }
    
    
    useEffect(() => {
        
        // Obtener base de datos
        const db = getDatabase(app)
        
        let sumaCount, fichasCount, invitadosCount = 0
        let keys = ["Ficha, Nombre, Dias"]
        let guests = []

        // Obtener referencia de usuarios
        const usersRef = ref(db, 'users/')


        let generalCsv = ["Ficha, Nombre, Dias"]
        
        // Obtener los datos
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val()
            console.log(data)
            fichasCount = Object.keys(data).length
            setUsers(data)
            Object.values(data).forEach(key => {
                //console.log(key)
                // return {
                //     id: key.id,
                //     activity: key.activity,
                //     participant: key.participant,
                //     selectedSchedule: key.selectedSchedule
                // }
                keys.push(`${key.token}, ${key.name.trim()}, ${key.days}`)
                generalCsv.push(`${key.token}, ${key.name.trim()}, ${key.days}`)

            })

            // Guardamos el csv de los usuarios
            
            setUsuariosCsv(keys)        
            setFichas(fichasCount)
        }, [])


        // Obtener referencia de invitados
        const guestsRef = ref(db, 'guests/')
        // Obtener los datos

  
        onValue(guestsRef, (snapshot) => {
            const data = snapshot.val();
            guests = data
            console.log(data)
            Object.values(guests).forEach( guest => {
                console.log(guest)
                
                generalCsv.push(`${guest.token.trim()}, ${guest.name.toUpperCase().trim()}, ${users[guest.token].days}`)
            })
            
            invitadosCount = Object.keys(data).length
            setInvitados(invitadosCount)
        })
        setReporteGeneral(generalCsv)

        

        sumaCount = Number(tokens) + Number(guests)


    }, [auth])


    let sumUp = tokens + guests

    const handleDownloadCSV = () => {
        generateCSV(reporteGeneral, "Reporte General");
    };
    

    const handleDownloadTokenCSV = function() {
        generateCSV(usuariosCsv, "Reporte por ficha")
    }

    return (
        <div className="md:w-2/5 text-center mx-5 md:mx-auto mt-20 medium-shadow border-t-4 px-10 pt-5 pb-10 border-green-500 rounded-lg">

            {
                msg ? (
                    <>
                        <div className=" bg-red-700 text-white rounded-lg px-3 py-3">
                            <p>{msg}</p>
                        </div>
                    </>
                )
                    : (
                        <>
                        </>
                    )
            }

            {

                auth ? (
                    <>
                        <p className='text-green-900 text-2xl font-bold my-5 text-center'> Reporte General de <span className="block">Accesos a la Plataforma</span></p>
                        <p className='text-green-700 text-lg font-bold my-1 text-left'>Total de Fichas registradas: <span className='text-black'>{tokens}</span> </p>
                        <p className='text-green-700 text-lg font-bold my-1 text-left'>Total de Acompañantes: <span className='text-black'>{guests}</span></p>
                        <p className='text-green-700 text-lg font-bold my-1 text-left'>Total de Invitados esperados: <span className='text-black'>{sumUp}</span></p>
                        <button
                            className="medium-shadow my-5 text-md w-auto py-2 px-14 uppercase bg-green-700 rounded-md font-bold hover:bg-green-600 text-white cursor-pointer transition-colors text-center items-center"
                            onClick={handleDownloadCSV}
                        >
                            Descargar reporte general
                        </button>
                        
                    </>

                )
                    : (
                        <>
                            <div className="mb-10 mt-5">
                                <p className='text-rose-600 font-semibold text-center'>!ADVERTENCIA!</p>
                                <p className='text-rose-600 font-semibold text-center mb-3'>!ACCESO RESTRINGIDO A ADMINISTRADORES!</p>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4 mb-3'>
                                <p className='text-center font-semibold my-1'>Ingrese la clave de acceso:</p>
                                <input type="password" className='bg-gray-300 focus:outline-none rounded-md p-2' onChange={e => setPassword(e.target.value)} value={password}  />
                            </div>
                            <div className='flex gap-5 justify-center mt-5'>
                                <button onClick={() => handleAuth()} className='bg-green-800 hover:bg-green-600 transition-colors text-white p-2 rounded-md px-5 font-semibold'>Ingresar</button>
                            </div>

                        </>
                    )

            }
        </div>
    )

}
export default Reports;
