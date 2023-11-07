import { ButtonStyle } from './types';

export const buttonStyles = (buttonType: ButtonStyle = ButtonStyle.PRIMARY) => {
  const classNames = [
    'block',
    'px-4',
    'py-2',
    'rounded-3xl',
    'px-6',
    'py-2',
    'text-center',
    'font-semibold',
    'transition',
  ];

  switch (buttonType) {
    case 'primary':
      classNames.push('text-white', 'bg-primary', 'hover:bg-primary-light');
      break;
    case 'secondary':
      classNames.push('text-primary', 'bg-gray-100', 'hover:bg-gray-200');
      break;
    case 'green':
      classNames.push('text-white', 'bg-green-600', 'border-[1px]', 'border-green-600', 'hover:bg-green-700', 'hover:border-green-600');
      break;
    case 'green-outline':
      classNames.push('text-green-600', 'border-[1px]', 'border-green-600');
      break;
  }

  return classNames;
};
