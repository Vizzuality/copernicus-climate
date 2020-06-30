import SearchIcon from 'assets/img/svgs/search-filter.svg';

export const searchSelectStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '100%',
    cursor: 'pointer',
  }),
  valueContainer:  (provided, state) => ({
    ...provided,
    height: '100%',
    width: '100%',
    paddingLeft: '43px',
    border: state.isSelected ? 'none' : 'none',
    ':before': {
      opacity: state.selectProps.isIcon ? '1' : '0',
      content: `url(${SearchIcon})`,
      position: 'absolute',
      left: '0',
      top: '20px',
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    width: '100%',
    border: '2px solid #941333',
    borderTop: 'none',
    color: state.selectProps.menuColor,
    borderRadius: 0,
    padding: 0,
    marginTop: '2px',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
    width: '100%',
  }),
  option: (provided, state) => ({
    ...provided,
    textTransform: 'capitalize',
    backgroundColor: state.isSelected ? '#E6E6E6' : 'white',
    color: '#000000',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    fontSize: '16px',
    lineHeight: '22px',
    ':hover': {
      backgroundColor: '#E6E6E6',
    },
    width: '100%'
  }),
  input: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    top: '5px',
  }),  
  control: (provided, { selectProps: { width }, isSelected }) => ({
    ...provided,
    width: width,
    height: '100%',
    border: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),  
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const width = state.selectProps.isIcon ? '80%' : 'auto';
    return {
      ...provided,
      width,
      opacity,
      transition,
      textTransform: 'capitalize',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'wrap',
      textOverflow: 'initial',
      lineHeight: '22px',
    };
  }
}
