//@flow

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrangeA700} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  drawer: {
    width: 230,
    color: '#2F122E',
  },
  raisedButton: {
    primaryColor: deepOrangeA700,
  },
});

export default themeDefault;
