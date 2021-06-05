import React, { SyntheticEvent } from 'react';

import styles from './styles.module.css';

type _Props = {
  ref?: any;
  element: string | React.ReactElement | React.ReactNode;
  description: string;
  color?: string;
  position?: Position;
  noPadding?: boolean;
  maxWidth?: number;
  setActionOnClick?: boolean;
  toolTipAction?: () => any;
};

export interface Position extends Record<string, unknown> {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
}

const Tooltip = (props: _Props): React.ReactElement => {
  const {
    element,
    description,
    color,
    position,
    noPadding,
    maxWidth,
    setActionOnClick
  } = props;
  const { toolTipAction } = props;

  const [toggle, setToggle] = React.useState<boolean>(false);

  let descriptionTextStyle = noPadding
    ? Object.assign(position, { padding: 0 })
    : position;
  descriptionTextStyle = maxWidth
    ? Object.assign(descriptionTextStyle, { maxWidth })
    : descriptionTextStyle;

  const descriptionTextClass: string = toolTipAction
    ? [styles.description, styles.hoverable].join(' ')
    : styles.description;

  const onClickTooltip = (e: SyntheticEvent) => {
    if (toolTipAction) {
      return toolTipAction();
    } else {
      return e.preventDefault();
    }
  };

  const onClickToggle = (e: SyntheticEvent) => {
    if (!setActionOnClick || setActionOnClick === undefined) {
      return e.preventDefault();
    }
    return setToggle(!toggle);
  };

  return (
    <div className={styles.root}>
      <div
        className={
          toggle ? [styles.element, styles.clicked].join(' ') : styles.element
        }
        style={{ color: color }}
      >
        <div onClick={onClickToggle}>{element}</div>
        <div
          className={descriptionTextClass}
          style={descriptionTextStyle}
          onClick={onClickTooltip}
        >
          <div>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
