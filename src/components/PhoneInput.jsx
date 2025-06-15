import PhoneInputLib from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInput = ({ value, onChange, defaultCountry = 'us' }) => {
  return (
    <PhoneInputLib
      country={defaultCountry}
      value={value}
      onChange={onChange}
      inputClass="w-full px-4 py-2 border border-gray-300 rounded"
      containerClass="w-full"
      enableSearch
      placeholder='Number'
    />
  );
};

export default PhoneInput;
