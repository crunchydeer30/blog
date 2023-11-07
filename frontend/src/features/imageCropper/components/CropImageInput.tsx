import { useState } from 'react';
import ImageCropper from './ImageCropper';
import Button from '../../../UI/Elements/Button/Button';

interface ICropImageInputProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  aspectRatio: number;
  name: string;
}

const CropImageInput = (props: ICropImageInputProps) => {
  const [imageSrc, setImageSrc] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImageSrc('');
    const file = e.target.files ? e.target.files[0] : null;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    if (file) reader.readAsDataURL(file);
  };

  const remove = () => {
    setImageSrc('');
    props.onChange('');
  };

  if (props.value)
    return (
      <div className="block max-h-[350px] aspect-[21/9] bg-lightgray flex items-center justify-center rounded-2xl p-10 relative shadow z-0">
        <div className="h-full flex justify-center">
          <img
            src={props.value}
            className="h-full object-fit"
            alt={props.name}
          />
        </div>

        <Button
          classes={['absolute', 'bottom-3', 'left-1/2', 'translate-x-[-50%]']}
          onClick={remove}
        >
          Remove
        </Button>
      </div>
    );

  return (
    <div className="block max-h-[350px] aspect-[21/9] bg-lightgray flex items-center justify-center rounded-2xl p-10 relative shadow">
      {imageSrc ? (
        <ImageCropper
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          setCroppedImage={props.onChange}
          aspectRatio={+props.aspectRatio}
        />
      ) : (
        <>
          <label
            htmlFor={props.name}
            style={{ aspectRatio: props.aspectRatio }}
            className={`block h-full border-dashed border-2 border-secondary rounded-2xl flex items-center justify-center cursor-pointer grow-0 shrink-0`}
          >
            <span className="w-[60%] text-center text-secondary text-xl">
              Upload an image
            </span>
          </label>
          <input
            id={props.name}
            name={props.name}
            type="file"
            onChange={onChange}
            accept="image/png, image/jpeg"
            className="hidden"
          />
        </>
      )}
    </div>
  );
};

export default CropImageInput;
