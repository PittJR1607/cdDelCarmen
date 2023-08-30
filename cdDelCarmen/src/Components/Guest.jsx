import { useState } from "react"

function Guest({guest, setGuests, guests}) {

    const [guestData, setGuestData] = useState({
        id: guest.id,
        beneficiary: false
    })

    function handleGuestChange() {
        setGuests( guests.map( stateGuest => {
            if( stateGuest.id === guestData.id ){
                return guestData
            }
            else{
                return stateGuest
            }
        } ))
    } 

    function handleDeleteGuest() {
        setGuests( guests.filter( stateGuest => stateGuest.id !== guest.id) )
    }

    return (
        <div className="mt-5 w-11/12 mx-auto text-left text-s light-shadow mb-5 px-5 rounded border-t-2 border-green-600">
            <div className="mt-2">

                <input
                    placeholder="Nombre Completo"
                    className="bg-gray-100 w-full border-b-2 border-b-gray-400 transition-colors  focus:outline-none focus:border-b-4 focus:border-b-green-700"
                    type="text"
                    value={guestData.name ? guestData.name : ''}
                    onChange={e => {
                        setGuestData({...guestData, name: e.target.value})
                        handleGuestChange()
                    }}
                />
            </div>
            <div className="mt-2">

                <input
                    placeholder="Edad"
                    className="bg-gray-100 w-full border-b-2 border-b-gray-400 transition-colors  focus:outline-none focus:border-b-4 focus:border-b-green-700"
                    type="number"
                    value={guestData.age ? guestData.age : ''}
                    onChange={e => {
                        setGuestData({...guestData, age: e.target.value})
                        handleGuestChange()
                    }}
                />
            </div>
            <div className="flex gap-3 mt-4 ">
                <label className="text-gray-400 ">Derechohabiente</label>
                <input 
                    type="checkbox" 
                    className=" h-5 w-5 mt-1 "
                    checked={ guestData.beneficiary }
                    onChange={e => {
                        setGuestData({...guestData, beneficiary: e.target.checked})
                        handleGuestChange()
                    }}
                />
            </div>
            <div className="flex flex-1 justify-end mt-4 md:mt-0 pb-2 ">
                <button
                    className="light-shadow bg-red-800 hover:bg-red-700 transition-colors rounded sm:p-2 text-white font-bold w-full sm:w-auto p-1"
                    onClick={() => handleDeleteGuest()}
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Guest