import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface SearchPropsType {
  onchange: (value: string) => void;
  ondelete: () => void;
  search: () => void;
}

const Search: React.FC<SearchPropsType> = ({ onchange, ondelete, search }) => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        onChange={(e) => onchange(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="جستجو بر اساس کد درخواست"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <HighlightOffIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
