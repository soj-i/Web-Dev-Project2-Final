'use client';



import { useRouter } from "next/navigation";
import '/src/app/globals.css';


interface HeaderProps {
    title: string | number;
    homePage: boolean;
  }
  
  export default function Header({ title, homePage }: HeaderProps) {
  
      const router = useRouter();
      
      const flipPage = () => {
          if (homePage) {
          router.push('/create');
      } else {
        router.push('/'); // or router.back() ? might lead to bugs if user
      }
     };                   // accesses website from /recipe directory
  
    return (
      <>
       <header className = "h-16 flex justify-items-start items-bottom ">
        <h1 className = "text-6xl font-bold">
        {title}
        </h1>
        <button
        type = "button"
        id = "header-btn"
        tabIndex = {0}
        onClick = {flipPage}
        aria-label = {homePage ? 'Add Recipe' : 'Home'}
        className = 'text-2xl rounded-full bg-sky-500/50 py-2 px-4 shadow'>
          
          {homePage ? 'Add Recipe' : 'Home'}
        </button>
        
        </header>
      </>
    );
  }
