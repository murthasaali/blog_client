import toast from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';

const customToast = (message, icon) => {
  const toastId = toast.custom((t) => {
    setTimeout(() => {
      toast.dismiss(t.id);
    }, 2000);

    return (
      <div
        className={`${
          t.visible ? 'opacity-100  transition-all scale-105 duration-500' : 'opacity-0 scale-75  transition-all duration-500'
        } max-w-fit w-fit bg-cyan-400 bg-opacity-40 shadow-lg rounded-lg pointer-events-auto flex justify-center items-center py-2`}
      >
        <div className="w-fit px-4 flex gap-3">
          <div className="flex items-center justify-center gap-3">
            <div className="">
              {icon ? icon : <FaHeart />}
            </div>
            <p className="text-xs font-thin text-stone-100">
              {message}
            </p>
          </div>
        </div>
      </div>
    );
  });

  return toastId;
};

export default customToast;
