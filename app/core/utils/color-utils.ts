import AppColors from "../static/AppColors";

function getColor (color?: string): string {
  switch (color) {
    case 'primary':
      return AppColors.blue;
    case 'secondary':
      return 'bg-secondary-500';
    case 'success':
      return 'bg-success-500';
    case 'danger':
      return 'bg-danger-500';
    case 'warning':
      return 'bg-warning-500';
    case 'info':
      return 'bg-info-500';
    case 'light':
      return 'bg-light-500';
    case 'dark':
      return 'bg-dark-500';
    default:
      return AppColors.black;
  }
}

// eslint-disable-next-line @typescript-eslint/object-curly-spacing
export { getColor };
