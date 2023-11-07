const ModalSpinner = () => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 bg-white rounded-lg relative flex flex-col w-full outline-none focus:outline-none p-6">
            <svg className="w-16 h-16 animate-spin">
              <use href={`/icons/sprite.svg#icon-spinner`} />
            </svg>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalSpinner;
