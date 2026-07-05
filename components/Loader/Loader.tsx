import css from './Loader.module.css';

type LoaderProps = {
  text?: string;
  fullScreen?: boolean;
};

export default function Loader({
  text = 'Loading Note Flow',
  fullScreen = true,
}: LoaderProps) {
  return (
    <div className={fullScreen ? css.screen : css.inline}>
      <div className={css.loaderCard}>
        <div className={css.spinner} aria-hidden="true" />
        <p className={css.text}>{text}</p>
      </div>
    </div>
  );
}