import { useState } from 'react';
import FormGroup from '../../../UI/Form/FormGroup';
import Input from '../../../UI/Form/Input';
import InputLabel from '../../../UI/Form/InputLabel';
import TextArea from '../../../UI/Form/TextArea';
import CropImageInput from '../../imageCropper/components/CropImageInput';
import Button from '../../../UI/Elements/Button/Button';
import useUpdateProfile from '../hooks/useUpdateProfile';
import { UserProfile } from '../types';

interface ProfileEditFormProps {
  profile: UserProfile;
}

const ProfileEditForm = ({ profile }: ProfileEditFormProps) => {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [personalInfo, setPersonalInfo] = useState(profile.personalInfo);
  const [profileImage, setProfileImage] = useState(profile.profileImage);

  const { updateProfile } = useUpdateProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName,
      personalInfo,
      profileImage,
    });
  };

  return (
    <form className="flex flex-col gap-14" onSubmit={handleSubmit}>
      <FormGroup classes={['gap-4']}>
        <p className="text-lg">Profile Image</p>
        <CropImageInput
          name="profileImage"
          value={profileImage}
          aspectRatio={1}
          onChange={setProfileImage}
        />
      </FormGroup>

      <FormGroup classes={['gap-4']}>
        <InputLabel htmlFor="displayName" classes={['text-lg']}>
          Display name
        </InputLabel>
        <Input
          type="text"
          placeholder="Display name"
          value={displayName}
          onChange={setDisplayName}
          name="title"
        />
      </FormGroup>

      <FormGroup classes={['gap-4']}>
        <InputLabel htmlFor="personalInfo" classes={['text-lg']}>
          Personal Info
        </InputLabel>
        <TextArea
          name="personalInfo"
          value={personalInfo}
          onChange={setPersonalInfo}
          placeholder="Personal Info"
        ></TextArea>
      </FormGroup>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ProfileEditForm;
