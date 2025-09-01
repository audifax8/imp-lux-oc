import { ReactNode, useState, useEffect } from 'react';
import clsx from 'clsx';

import './index.scss';

interface SwitchProps {
  label?: string | ReactNode;
  onChange?: (checked: boolean) => void;
  className?: string;
  checked?: boolean;
}

export function Switch({ label, onChange, className, checked: initialChecked = false }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(initialChecked);

  useEffect(() => {
    setIsChecked(initialChecked);
  }, [initialChecked]);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <label className={clsx('yr-switch', className)}>
      <input type="checkbox" className="yr-switch-input" role="switch" checked={isChecked} onChange={handleChange} />
      <span className="yr-switch-track">
        <span className="yr-switch-knob" />
      </span>
      {label && <span className="yr-switch-label">{label}</span>}
    </label>
  );
}
