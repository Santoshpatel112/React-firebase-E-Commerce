// import React, { useContext } from 'react'
// import myContext from '../context/data/mycontext';
// // flat icon for icon 
// function Testimonial() {
//     const context = useContext(myContext)
//     const { mode } = context
//     return (
//         <div>
//             <section className="text-gray-600 body-font mb-10">
//                 <div className="container px-5 py-10 mx-auto">
//                     <h1 className=' text-center text-3xl font-bold text-black' style={{color: mode === 'dark' ? 'white' : ''}}>Testimonial</h1>
//                     <h2 className=' text-center text-2xl font-semibold mb-10' style={{color: mode === 'dark' ? 'white' : ''}}>What our <span className=' text-pink-500'>customers</span> are saying</h2>
//                     <div className="flex flex-wrap -m-4">
//                         <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
//                             <div className="h-full text-center" style={{color: mode === 'dark' ? 'white' : ''}}>
//                                 <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://cdn-icons-png.flaticon.com/128/17863/17863140.png" />
//                                 <p style={{color: mode === 'dark' ? 'white' : ''}} className="leading-relaxed">Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
//                                 <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
//                                 <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Santosh Patel</h2>
//                                 <p style={{color: mode === 'dark' ? 'white' : ''}} className="text-gray-500">Frontend Developer</p>
//                             </div>
//                         </div>
//                         <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
//                             <div className="h-full text-center">
//                                 <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://cdn-icons-png.flaticon.com/128/2763/2763444.png" />
//                                 <p  style={{color: mode === 'dark' ? 'white' : ''}}className="leading-relaxed">Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
//                                 <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
//                                 <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">React Js</h2>
//                                 <p style={{color: mode === 'dark' ? 'white' : ''}} className="text-gray-500">UI Develeoper</p>
//                             </div>
//                         </div>
//                         <div className="lg:w-1/3 lg:mb-0 p-4">
//                             <div className="h-full text-center">
//                                 <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://webknudocs.vercel.app/logo/react.png" />
//                                 <p style={{color: mode === 'dark' ? 'white' : ''}} className="leading-relaxed">Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
//                                 <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
//                                 <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">React Js</h2>
//                                 <p  style={{color: mode === 'dark' ? 'white' : ''}}className="text-gray-500">CTO</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default Testimonial


import React, { useContext } from 'react'
import myContext from '../context/data/mycontext';
// flat icon for icon 
function Testimonial() {
    const context = useContext(myContext)
    const { mode } = context
    return (
        <div style={{ backgroundColor: mode === 'dark' ? '#282c34' : 'white' }}>
            <section className={`text-gray-600 body-font mb-10 ${mode === 'dark' ? 'bg-gray-900' : ''}`}>
                <div className="container px-5 py-10 mx-auto">
                    <h1 className='text-center text-3xl font-bold' style={{color: mode === 'dark' ? 'white' : 'black'}}>Testimonial</h1>
                    <h2 className='text-center text-2xl font-semibold mb-10' style={{color: mode === 'dark' ? 'white' : 'black'}}>What our <span className='text-pink-500'>customers</span> are saying</h2>
                    <div className="flex flex-wrap -m-4">
                        {[
                            {
                                img: "https://cdn-icons-png.flaticon.com/128/17863/17863140.png",
                                name: "Santosh Patel",
                                role: "Frontend Developer"
                            },
                            {
                                img: "https://cdn-icons-png.flaticon.com/128/2763/2763444.png",
                                name: "React Js",
                                role: "UI Developer"
                            },
                            {
                                img: "https://webknudocs.vercel.app/logo/react.png",
                                name: "React Js",
                                role: "CTO"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                                <div 
                                    className="h-full text-center p-4 rounded-lg" 
                                    style={{
                                        backgroundColor: mode === 'dark' ? '#3a3f48' : 'white',
                                        color: mode === 'dark' ? 'white' : 'black',
                                        boxShadow: mode === 'dark' ? '0 4px 6px rgba(0,0,0,0.1)' : '0 4px 6px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <img 
                                        alt="testimonial" 
                                        className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200" 
                                        src={testimonial.img} 
                                        style={{ 
                                            borderColor: mode === 'dark' ? '#4a4f58' : 'gray-200',
                                            backgroundColor: mode === 'dark' ? '#4a4f58' : 'white'
                                        }}
                                    />
                                    <p className="leading-relaxed mb-4">
                                        Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.
                                    </p>
                                    <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                    <h2 
                                        className="font-medium title-font tracking-wider text-sm uppercase"
                                        style={{color: mode === 'dark' ? '#ff4162' : 'black'}}
                                    >
                                        {testimonial.name}
                                    </h2>
                                    <p 
                                        className="text-sm"
                                        style={{color: mode === 'dark' ? 'lightgray' : 'gray'}}
                                    >
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial