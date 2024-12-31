import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArrays, setpasswordArrays] = useState([])
  const ref = useRef()
  const passwordRef = useRef()


  useEffect(() => {
    let password = localStorage.getItem("passwords")
    if (password) {
      setpasswordArrays(JSON.parse(password))
    }

  }, [])


  const showPassword = () => {
    //   alert("password")
    if (ref.current.src.includes("icons/show.png")) {
      ref.current.src = "icons/hide.png"
      passwordRef.current.type = "text"
    } else {
      ref.current.src = "icons/show.png"
      passwordRef.current.type = "password"
    }
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: [e.target.value] })

  }

  const savePassword = () => {
    setpasswordArrays([...passwordArrays, {...form, id: uuidv4()}])
    localStorage.setItem("passwords", JSON.stringify([...passwordArrays, {...form, id: uuidv4()}]))
    console.log([...passwordArrays, {...form, id: uuidv4()}])
    setform({ site: "", username: "", password: "" })
  }

  const copyText = (text) => {
    if (!navigator.clipboard) {
      console.error('Clipboard API not supported in this browser');
    }

    navigator.clipboard.writeText(text)
    toast('password copied!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
  }

  const deletePassword = (id) => {
    console.log("deleting "+id)
    let c = confirm("do you really want to delete this password id ?")
    if(c){

      setpasswordArrays(passwordArrays.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArrays.filter(item => item.id !== id)))
    }
  }

  const editPassword = (id) => {
    console.log("editing "+id)
    setform(passwordArrays.filter(i => i.id ===id)[0])
    setpasswordArrays(passwordArrays.filter(item => item.id !== id))
  }
  



  return (
    <>

      < ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-violet-50  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

      <div className="container my-container p-[1rem]">

        <div className="text-black flex flex-col p-4 justify-center items-center">
          <h1 className='text-center text-2xl'>PASS OP</h1>
          <p className='text-center font-bold'>your own password Manager</p>

          <div className='flex flex-col p-4 text-black gap-3 items-center'>

            <input value={form.site} onChange={handleChange} placeholder='Website URL' className='rounded-full border border-purple-700 p-4 py-1' type="text" name="site" id="" />
            <div className='w-full flex justify-between gap-4'>
              <input value={form.username} onChange={handleChange} placeholder='Username' className='rounded-full border border-purple-700 p-4 py-1' type="text" name="username" id="" />
              <div className="relative">

                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Password' className='rounded-full border border-purple-700 p-4 py-1' type="password" name="password" id="" />
                <span onClick={showPassword} className='absolute right-0 px-2 py-2 cursor-pointer'><img ref={ref} width={20} src="icons/show.png" alt="show" /></span>
              </div>
            </div>
            <button onClick={savePassword} className='text-white flex justify-center items-center gap-2  rounded-full bg-violet-600 border-2 border-violet-800 hover:bg-violet-800 px-6 py-2 w-fit'>
              <lord-icon
                src="https://cdn.lordicon.com/sbnjyzil.json"
                trigger="hover">
              </lord-icon>
              save</button>
          </div>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl py-4 px-4'>your passwords</h2>
          {passwordArrays.length === 0 && <div> no passwords to show</div>}
          {passwordArrays.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className='bg-violet-500 text-white py-22'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-violet-100'>
              {passwordArrays.map((item, index) => {

                return <tr key={index}>
                  <td className=' text-center min-w-32 py-2 underline' ><a href={item.site} target='_blank'>{item.site}</a></td >
                  <td className='text-center min-w-32 py-2' >{item.username}</td >
                  <td className='flex justify-center items-center gap-2 text-center min-w-32 py-2' >{item.password}
                    <img onClick={() => copyText(item.password)} className='w-4 cursor-pointer' src="/icons/copy.png" alt="copy" />
                  </td >
                  <td className='text-center w-32 py-2' >
                    <span className='flex gap-1'>
                      <img onClick={() => editPassword(item.id)} width={25} src="/icons/edit.png" alt="edit" />
                      <img onClick={() => deletePassword(item.id)} width={25} src="/icons/delete.png" alt="delete" />
                    </span> 
                  </td >
                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>

    </>

  )
}

export default Manager