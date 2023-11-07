import SelectInput from '../../../UI/Form/SelectInput';
import useTopics from '../../topics/hooks/useTopics';

interface SelectTopicInputProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  classes?: string[];
}

const SelectTopicInput = (props: SelectTopicInputProps) => {
  const { topics } = useTopics();

  if (!topics) return <p>Error: Topics not found</p>;

  return (
    <SelectInput value={props.value} onChange={props.onChange}>
      <option>S</option>
    </SelectInput>
  );
};

export default SelectTopicInput;
