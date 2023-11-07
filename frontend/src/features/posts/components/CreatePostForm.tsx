import { useState } from 'react';
import MarkdownEditor from '../../markdown/components/MarkdownEditor';

import useCreatePost from '../hooks/useCreatePost';
import FormGroup from '../../../UI/Form/FormGroup';
import Input from '../../../UI/Form/Input';
import InputLabel from '../../../UI/Form/InputLabel';
import PageHeading from '../../../UI/PageHeading';
import CropImageInput from '../../imageCropper/components/CropImageInput';
import Button from '../../../UI/Elements/Button/Button';
import TextArea from '../../../UI/Form/TextArea';

const CreatePostForm = () => {
  const { createPost } = useCreatePost();

  const topicId = '1aacb32d-71a1-4adf-8142-795141dcf33e';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [header, setHeader] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = { title, description, content, header, thumbnail, topicId };
    createPost(newPost);
  };

  return (
    <section>
      <form className="flex flex-col gap-14" onSubmit={handleSubmit}>
        <PageHeading>Add new post</PageHeading>
        <FormGroup classes={['gap-6']}>
          <InputLabel htmlFor="title" classes={['text-lg']}>
            Post Title
          </InputLabel>
          <Input
            type="text"
            placeholder="Post title..."
            value={title}
            onChange={setTitle}
            name="title"
          />
        </FormGroup>

        <FormGroup classes={['gap-6']}>
          <InputLabel htmlFor="title" classes={['text-lg']}>
            Post Description
          </InputLabel>
          <TextArea
            name="description"
            placeholder="Post description..."
            value={description}
            onChange={setDescription}
            rows={5}
          ></TextArea>
        </FormGroup>

        <FormGroup classes={['gap-6']}>
          <p className="text-lg">Post Thumbnail</p>
          <CropImageInput
            name="thumbnail"
            value={thumbnail}
            onChange={setThumbnail}
            aspectRatio={1}
          />
        </FormGroup>

        <FormGroup classes={['gap-6']}>
          <p className="text-lg">Post Header</p>
          <CropImageInput
            name="header"
            value={header}
            onChange={setHeader}
            aspectRatio={21 / 9}
          />
        </FormGroup>

        <FormGroup classes={['gap-6', 'w-full']}>
          <p className="text-lg">Post Content</p>
          <div className="border rounded-xl min-h-[400px] flex flex-col max-w-[93vw]">
            <MarkdownEditor value={content} onChange={setContent} />
          </div>
        </FormGroup>

        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
};

export default CreatePostForm;
