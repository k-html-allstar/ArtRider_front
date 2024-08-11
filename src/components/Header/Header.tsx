import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

const Header = () => {
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();

  return (
    <div className='flex justify-between'>
        <div>Header</div>
        { user ? ( <div>{user.name}님</div>) : (<div onClick={()=>navigate('/login')} className='bg-yellow-400 px-5'>로그인</div>)}
    </div>
  )
}

export default Header