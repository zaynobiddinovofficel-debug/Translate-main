import Header from '../components/Header';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-[80vh] flex-col gap-3 text-center">
        <span className="text-[60px] opacity-75 leading-none font-bold">4<span className="text-[#A445ED]">0</span>4</span>
        <span className="text-lg">Page not <b>found</b></span>
        <Link
          to="/"
          className="flex items-center gap-2 text-purple-600 hover:text-purple-400 underline"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    </>
  );
}