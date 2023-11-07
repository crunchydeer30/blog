import '@mdxeditor/editor/style.css';

import { MDXEditor, headingsPlugin } from '@mdxeditor/editor';
import {
  toolbarPlugin,
  imagePlugin,
  codeBlockPlugin,
  linkPlugin,
  linkDialogPlugin,
  listsPlugin,
} from '@mdxeditor/editor';

import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';
import { InsertImage } from '@mdxeditor/editor';
import { BlockTypeSelect } from '@mdxeditor/editor';
import { CreateLink } from '@mdxeditor/editor';
import { ListsToggle } from '@mdxeditor/editor';

interface IMarkdownEditorProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const MarkdownEditor = (props: IMarkdownEditorProps) => {
  return (
    <MDXEditor
      markdown={props.value}
      onChange={props.onChange}
      contentEditableClassName="md-edit"
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <InsertImage />
              <BlockTypeSelect />
              <CreateLink />
              <ListsToggle />
            </>
          ),
        }),
        imagePlugin(),
        codeBlockPlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        listsPlugin(),
      ]}
    />
  );
};

export default MarkdownEditor;
