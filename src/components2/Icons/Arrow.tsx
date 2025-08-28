import clsx from 'clsx';

type ArrowDirection = 'up' | 'down' | 'left' | 'right';

export function ArrowIcon({
  size = 16,
  direction = 'down',
  className
}: {
  size?: number;
  direction?: ArrowDirection;
  className?: string;
}) {
  const rotation = {
    down: 0,
    up: 180,
    left: -90,
    right: 90
  }[direction];

  return (
    <svg
      width={size}
      height={size + 1}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation}deg)` }}
      className={clsx('yr-icon-arrow', className)}>
      <path d="M7.99998 13.4742L0.195312 5.66923L1.13798 4.72656L7.99998 11.5882L14.862 4.72656L15.8046 5.66923L7.99998 13.4742Z" />
    </svg>
  );
}
