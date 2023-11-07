import { useState } from "react";

interface IModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = (props: IModalProps) => {
  const [isShown, setIsShown] = useState(true);

  const handleClose = () => {
    setIsShown(false);
    if (props.onClose) props.onClose();
  };

  if(!isShown) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="w-[400px] relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-6">
            <section className="flex justify-between items-center">
              <h2>Title</h2>
              <button onClick={handleClose}>
                <svg className="w-5 h-5 fill-secondary hover:fill-primary">
                  <use href={`/icons/sprite.svg#icon-close`} />
                </svg>
              </button>
            </section>
            <div>{props.children}</div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
