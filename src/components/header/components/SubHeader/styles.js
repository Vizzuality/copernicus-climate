import SearchIcon from 'assets/img/svgs/search-filter.svg';

const searchStyles = ({
  ':before': {
    content: `url(${SearchIcon})`,
    position: 'absolute',
    left: '0',
    top: '20px',
  },
})

export const searchSelectStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '100%',
    cursor: 'pointer',
    maxWidth: state.selectProps.isIcon ? '250px' : '175px',
  }),
  valueContainer:  (provided, state) => ({
    ...provided,
    height: '100%',
    paddingLeft: state.selectProps.isIcon ? '43px' : '0',
    border: state.isSelected ? 'none' : 'none',
    ...searchStyles,
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
  }),
  option: (provided, state) => ({
    ...provided,
    textTransform: 'capitalize',
    backgroundColor: state.isSelected ? '#E6E6E6' : 'white',
    color: '#000000',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    ':hover': {
      backgroundColor: '#E6E6E6',
    },
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
    return {
      ...provided,
      opacity,
      transition,
      textTransform: 'capitalize',
    };
  }
}
