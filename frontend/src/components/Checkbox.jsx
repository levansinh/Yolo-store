import { useRef } from "react";
import PropTypes from "prop-types";
function CheckBox(props) {
  const inputRef = useRef();
  const onChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current);
    }
  };
  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        ref={inputRef}
        onChange={onChange}
        checked={props.checked}
      />
    
      {props.lable}
    </label>
  );
}
CheckBox.propTypes = {
  lable: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};
export default CheckBox;
