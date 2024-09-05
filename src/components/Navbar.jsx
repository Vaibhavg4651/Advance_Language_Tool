const Navbar = () => {
  return (
    <div className="h-16 w-full flex justify-between items-center fixed top-0 z-10 md:pl-12 md:pr-12 pl-[5%] pr-2 border-b-2 bg-white cursor-pointer">
      <div>
        <p className="font-bold text-2xl text-blue-500">ENHANCER</p>
      </div>
      <div className="md:flex w-64 justify-between items-center font-semibold hidden ">
        <div>
          <p className="hover:text-blue-500">ABOUT</p>
        </div>
        <div>
          <p className="hover:text-blue-500">CONTACT</p>
        </div>
        <div>
          <p className="hover:text-blue-500">LOGIN</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar