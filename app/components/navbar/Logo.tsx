import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();

  const handleClick = () => {
    router.refresh(); // Navigate to the front page

    // Reload the page after a short delay to reset the categories
    setTimeout(() => {
      router.push('/');
    }, 100);
  };

  return (
    <Image
      onClick={handleClick}
      alt='Logo'
      className='bg-transparent hidden md:block cursor-pointer'
      height='100'
      width='100'
      src='/images/logo4.png'
    />
  );
};

export default Logo;
