import logo from '../../assets/images/chat-bubble.png';

const Logo = () => {
    return <div className=' h-fit flex justify-center flex-col'>
        <img className='w-16 mx-auto h-16' src={logo} alt="" />
        <h3 className='text-xl text-center font-bold'>Express Chat</h3>
    </div>
}

export default Logo