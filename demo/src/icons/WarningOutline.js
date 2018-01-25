import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let IconSvg = props => (
  <SvgIcon {...props}>
    <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
  </SvgIcon>
);
IconSvg = pure(IconSvg);
IconSvg.displayName = 'WarningOutline';
IconSvg.muiName = 'SvgIcon';

export default IconSvg;
