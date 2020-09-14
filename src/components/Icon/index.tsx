import React, { FunctionComponent } from 'react';

type IconProps = {
  name: string;
  size: number;
};

const Icon: FunctionComponent<IconProps> = (props: IconProps) => {
  const { name, size } = props;

  return (
    <svg
      width={size.toString()}
      height={size.toString()}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <use xlinkHref={`/assets/feather-sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
