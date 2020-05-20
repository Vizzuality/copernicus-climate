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
    borderBottom: '1px dotted pink',
    color: state.selectProps.menuColor,
    padding: 20,
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
    return { ...provided, opacity, transition };
  }
}
