import clsx from 'clsx';

type TitleProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export const Subtitle = ({ children, className, ...rest }: TitleProps) => {
  return (
    <div className={clsx('text-black dark:text-white', className)} {...rest}>
      {children}
    </div>
  );
};
