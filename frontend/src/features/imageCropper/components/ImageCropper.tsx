import { useState, createRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Button from '../../../UI/Elements/Button/Button';
import { ButtonStyle } from '../../../UI/Elements/Button/types';
import StatelessModal from '../../../UI/Elements/Modal/StatelessModal';

interface IImageCropperProps {
  imageSrc: string;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
  setCroppedImage: React.Dispatch<React.SetStateAction<string>>;
  aspectRatio: number;
}

const ImageCropper = (props: IImageCropperProps) => {
  const [imageSrc] = useState(props.imageSrc);
  const cropperRef = createRef<ReactCropperElement>();

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      props.setCroppedImage(
        cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
      );
    }
  };

  const cancel = () => {
    props.setImageSrc('');
  };

  return (
    <StatelessModal>
      <div className="flex flex-col gap-8">
        <Cropper
          style={{ height: 400, aspectRatio: props.aspectRatio }}
          ref={cropperRef}
          src={imageSrc}
          aspectRatio={props.aspectRatio}
          viewMode={1}
          minCropBoxHeight={100}
          minCropBoxWidth={100}
        />
        <section className="flex gap-4">
          <Button onClick={getCropData}>Crop</Button>
          <Button onClick={cancel} style={ButtonStyle.SECONDARY}>
            Cancel
          </Button>
        </section>
      </div>
    </StatelessModal>
  );
};

export default ImageCropper;
