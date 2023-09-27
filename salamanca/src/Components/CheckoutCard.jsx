

function CheckoutCard({check, handleDelete}) {

    

    return (
        <div className='border border-green-500 rounded-md flex items-center extralight-shadow py-2 px-2'>
            <div className='flex flex-col'>
                <p className='text-md font-semibold my-2 mx-3 '>
                    <span className='text-green-700 '>Invitado : </span> {check.participant}
                </p>
                <div className='flex flex-col'>
                    <div className='text-sm font-semibold mx-6 mb-1 md:gap-3 '>

                        <div className='text-green-600'>Actividad : <span className='text-black'>{check.activity}</span></div>
                        <div className='text-green-600'>Horario : <span className='text-black'>{check.selectedSchedule}</span></div>

                    </div>
                </div>

            </div>

            <div 
                className='mr-4 ml-6 '
                onClick={() => handleDelete(check)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-red-500  hover:text-red-900 transition-colors cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </div>

        </div>
    )
}

export default CheckoutCard