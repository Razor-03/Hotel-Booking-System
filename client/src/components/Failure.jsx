import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Success = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/profile');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='text-3xl text-rose-600 mx-auto'>
      Payment Canceled. Redirecting...
    </div>
  );
};

export default Success;
