import clsx from 'clsx';

type TitleProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export const Title = ({ children, className, ...rest }: TitleProps) => {
  return (
    <div
      className={clsx('text-3xl text-black dark:text-white', className)}
      {...rest}>
      {children}
    </div>
  );
};
