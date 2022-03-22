// Libraries
import React from 'react';
import { Spinner } from 'react-activity';
import 'react-activity/dist/library.css';

interface Props {
  text: string;
  isSubmitting: boolean;
}

const Button: React.FC<Props> = ({ text = 'BUSCAR', isSubmitting = false }) => {
  return (
    <a href="#">
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex hover:scale-95 duration-300 w-full h-14 rounded-2xl bg-dark-green text-xl text-white font-bold border-[#00b587] border-b-[0.4rem] active:border-b-[0.2rem] justify-center items-center"
      >
        {isSubmitting ? <Spinner color="#FFF" size={18} /> : text}
      </button>
    </a>
  );
};

export default Button;
