import { useState, useEffect } from "react"
import { app } from "../firebaseConfig/firebaseConfig"
import { getDatabase, ref, set, get, child } from 'firebase/database'
import { useNavigate, Link } from 'react-router-dom'
import Guest from "../Components/Guest"

function SignUp() {

    const [data, setData] = useState({
        regime: '-',
        days: '-'
    })
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const [guests, setGuests] = useState([])

    const [isChecked, setIsChecked] = useState(false)

    const[clickedTime, setClickedTime] = useState(null)

    const handleTimeSnap = () => {
        const currentTime = new Date().toLocaleTimeString();
        setClickedTime(currentTime)
    }

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('')
            }, 3000);
        }
    }, [error])

    function handleAddGuest() {
        if (guests.length < 10) {
            setGuests([...guests, {
                id: Date.now().toString(32) + Math.random().toString(32).replace('0.', ''),
                name: '',
                token: '',
                age: 0,
                beneficiary: false
            }])
        }
    }

    function handleSignUp() {
        if (data.regime === '-') {
            setError('El regimen no puede estar vacio')
            return
        }
        if (!isChecked) {
            setError('Debe aceptar la politica de privacidad')
            return
        }
        if (Object.values(data).includes('') || Object.values(data).length === 0) {
            setError('Todos los campos son obligatorios')

            return
        }
        let err = false
        if (guests.length > 0) {
            guests.forEach(guest => {
                if (!guest.name || !guest.age) {
                    err = true
                    setError('Faltan datos del invitado!')
                    return
                }
            })
        }
        if (!err) {
            signUp()
        }
    }

    function signUp() {

        const db = getDatabase(app)
        get(child(ref(db), `users/${data.token}`))
            .then(snapshot => {
                if (snapshot.exists()) {
                    setError('Esta ficha ya esta registrada')
                    return
                }
                else {
                    const userObj = {
                        name: data.name,
                        token: data.token,
                        regime: data.regime,
                        days: data.days
                    }
                    set(ref(db, 'users/' + data.token), userObj)
                    guestSignUp(userObj)
                }
            })
        
    }

    function guestSignUp(userObj) {
        const db = getDatabase(app)
        if (guests.length > 0) {
            guests.forEach(guest => {
                const guestObj = {
                    name: guest.name,
                    token: data.token,
                    age: guest.age,
                    beneficiary: guest.beneficiary,
                    id: Date.now().toString(32) + Math.random().toString(32).replace('0.', '')
                }
                set(ref(db, 'guests/' + guest.id), guestObj)
            })
        }
        window.scrollTo( {
            top: 0,
            behavior: "smooth"
        })
        setMessage('Registrado exitosamente!')
    };
    
    const goBack = () => {
        navigate('/');
    }

    return (
        <div>

            <div className="lg:w-2/5 text-center mx-5 lg:mx-auto  mt-20 medium-shadow border-t-4 border-green-500 rounded-lg mb-10">
                <div className=" mx-10 text-center mt-10 pb-10">
                    <label className=" text-green-700 text-3xl font-bold p-2 my-5"> Registrarse </label>

                    <input
                        className="bg-gray-100 w-full border-b-2 border-b-gray-400 transition-colors focus:outline-none focus:border-b-4 focus:border-b-green-700 mt-5"
                        type="text"
                        placeholder="Ficha PEMEX"
                        onChange={e => setData({ ...data, token: e.target.value.trim() })}
                    />
                    <input
                        className="bg-gray-100 w-full border-b-2 border-b-gray-400 transition-colors mt-5 focus:outline-none focus:border-b-4 focus:border-b-green-700"
                        type="text"
                        placeholder="Nombre Completo"
                        onChange={e => setData({ ...data, name: e.target.value })}
                    />

                    <div className="flex mt-5 gap-5">

                        <label className="text-gray-400" htmlFor="">Seleccione: </label>

                        <select
                            className="bg-gray-100 w-full text-gray-400 border-b-2 border-b-gray-500 focus:border-b-4 focus:border-b-green-700 outline-none transition-colors"
                            onChange={e => setData({ ...data, regime: e.target.value })}
                        >
                            <option value="-"> ----------- </option>
                            <option value="PC"> PC </option>
                            <option value="TC"> TC </option>
                            <option value="SP"> SP </option>
                            <option value="ST"> ST </option>
                            <option value="PC"> JUBILADO </option>
                        </select>
                    </div>
                    {/* 
                        Seleccionar fechas, comentado porque no se va a utilizar para salamanca
                    <div className="flex mt-5 gap-5">

                        <label className="text-gray-400" htmlFor="">Elija el/los dias que asistirá al evento: </label>

                        <select
                            className="bg-gray-100 w-full text-gray-400 border-b-2 border-b-gray-500 focus:border-b-4 focus:border-b-green-700 outline-none transition-colors"
                            onChange={e => setData({ ...data, days: e.target.value })}
                        >
                            <option value="-"> ----------- </option>
                            <option value="viernes"> Viernes 22 de Septiembre </option>
                            <option value="sabado"> Sabado 23 de Septiembre  </option>
                            <option value="ambos"> Viernes 22 y Sabado 23 de Septiembre </option>

                        </select>
                    </div> */}

                    <div className="mt-5 text-gray-400">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-500"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label className="ml-2">Acepto la {''}
                            <Link to="/privacy" className="underline text-blue-500 cursor-pointer" >
                                Política de Privacidad
                            </Link>
                        </label>
                    </div>

                    <div className="flex mt-5 w-full sm:justify-end gap-1 items-center">
                        <label>Agregar acompañante <span className="text-red-700">(Max 10)</span></label>
                        <button
                            className="p-1 text-green-700 hover:bg-green-700 hover:text-white rounded-full border-none transition-colors"
                            onClick={() => handleAddGuest()}
                        >

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>

                        </button>
                    </div>
                    <div className=" max-h-96 overflow-auto">
                        {
                            guests.map(guest => (
                                <Guest
                                    key={guest.id}
                                    guest={guest}
                                    setGuests={setGuests}
                                    guests={guests}

                                />
                            ))
                        }
                    </div>

                    {error !== '' ? <p className=" p-2 my-5 bg-red-800 text-white font-bold mx-auto text-center">{error}</p> : <p className="py-5 my-5">{''}</p>}
                    
                    {
                        message === "Registrado exitosamente!" &&

                        <div className="absolute h-full bg-green-600 top-0 w-full left-0 text-2xl lg:text-4xl">
                            <div onClick={goBack}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="absolute w-10 h-10 text-white mx-10 mt-10" >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                    />
                                </svg>
                            </div>
                            <div className="flex flex-col h-full justify-center items-center gap-5">
                                <div className="text-white">Registrado exitosamente!</div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-24 h-24 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-white">{clickedTime}</div>


                            </div>
                        </div>
                    }
                    <button
                        onClick={() => {
                            handleSignUp()
                            handleTimeSnap()
                        } }
                        className="medium-shadow mb-3 text-md w-auto py-2 px-14 uppercase bg-green-700 rounded-md font-bold hover:bg-green-600 text-white cursor-pointer transition-colors text-center items-center"
                    >
                        Registrarse</button>

                    <Link to="/reports">
                        <button type="button" className="block text-sm w-auto mx-auto  py-2 px-2 rounded-md font-bold text-blue-400 cursor-pointer hover:text-blue-700">
                            ¿Eres Administrador?
                        </button>
                    </Link>


                    <p className="mt-5 rights-advert text-gray-400">
                        © 2023 VonSavel. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp  