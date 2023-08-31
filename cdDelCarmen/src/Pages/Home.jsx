import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { app } from "../firebaseConfig/firebaseConfig"
import { getDatabase, ref, onValue } from 'firebase/database'
import { useRef } from "react"


function Home() {

    const divRef = useRef(null)
    const [activities, setActivities] = useState([]);


    useEffect(() => {
        const db = getDatabase(app)
        const activitiesRef = ref(db, 'activities/')
        onValue(activitiesRef, (snapshot) => {
            const data = snapshot.val()
            setActivities(data ? Object.values(data) : []);
        })

    }, []);

    function scrollDown() {
        const reference = divRef.current
        reference.scrollTo({
            top: reference.offsetHeight,
            behavior: 'smooth'
        })
    }

    return (
        <div className="">
            <div className="bg-gray">
                <div className="imagen-logo"
                    ref={divRef}
                >

                    <div className="rounded-lg backdrop-blur-xl bg-black/5 text-white" 
                        
                    >
                        <div className="heroSVG">
                        </div>

                        <div className="text-center -translate-y-32 mx-5">
                            <p className="mb-10 text-2xl font-bold ">Mundo Maya 2023</p>
                            <p className=""></p>
                            <p className="mb-10 text-2xl font-bold ">¡Regístrate con tu Ficha PEMEX!</p>
                            <p className="mb-10 text-2xl font-bold ">¡Habrá sorpresas y regalos!</p>
                            <Link to="/signUp" className="bg-gray-500 px-2 md:text-2xl  py-2 uppercase  rounded-md font-bold hover:text-black hover:bg-white text-white cursor-pointer transition-colors text-right items-center drop-shadow-lg">
                                Registrarse
                            </Link>
                        </div>
                        <div className="text-xl transition-all -translate-y-24">
                            <p className="text-center mt-10  ">Ver actividades</p>
                            <div className="arrowDown"
                    
                            >
                            </div> 

                        </div>
                      
                    </div>

                    <div className="cards gap-5 mx-5 md:mx-20 justify-center w-auto mb-20 mt-20 ">

                        {activities.map((activity) => (
                            <div key={activity.id} className="extraheavy-shadow rounded-lg backdrop-blur-lg pb-5 mt-5 flex flex-col  text-white">
                                <div className="w-full"
                                    style={
                                        {
                                            backgroundImage: `url('${activity.imgUrl}')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            height: 18 + 'rem',
                                            borderTopRightRadius: '0.4rem',
                                            borderTopLeftRadius: '0.4rem',
                                            marginBottom: '1rem'
                                        }
                                    }
                                >

                                </div>

                                <p className="text-xl md:text-2xl font-bold text-left mx-5">
                                    {activity.name}
                                </p>
                                <p className="text-xl md:text-xl font-bold text-left mx-5">
                                    {activity.date}
                                </p>
                                <p className="text-xl md:text-xl font-bold text-left mx-5">
                                    {activity.time}
                                </p>
                                { activity.minAge && (
                                    <p className="text-xl md:text-xl font-bold text-left mx-5 text-yellow-400">
                                    Edad minima: <span>{activity.minAge}</span>
                                </p>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Home;