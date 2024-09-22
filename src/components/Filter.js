import { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const options = [
  { value: 'numbers', label: 'Numbers' },
  { value: 'letters', label: 'Letters' },
];

export default function Filter({ onChange }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
    if (onChange) {
      onChange(selected);
    }
  };

  return (
    <div className="p-4">
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        value={selectedOptions}
        onChange={handleChange}
        isMulti
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
}
