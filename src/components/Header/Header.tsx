import { useNavigate } from 'react-router-dom';
import { useUserStore, useUserToken } from '../../store/userStore';

const Header = () => {
    const user = useUserStore((state) => state.user);
    const token = useUserToken((state)=>state.accessToken);
    const navigate = useNavigate();

  return (
    <div className='flex justify-between'>
        <div>Header</div>
        { token && user ? ( <div>{user.name}님</div>) : (<div onClick={()=>navigate('/login')} className='bg-yellow-400 px-5 cursor-pointer'>로그인</div>)}
    </div>
  )
}

export default Header