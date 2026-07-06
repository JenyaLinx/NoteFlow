import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.topLine}></div>

        <p className={css.copyright}>
          © {new Date().getFullYear()} <span>Note Flow</span>. All rights
          reserved.
        </p>

        <div className={css.info}>
          <div className={css.block}>
            <p className={css.label}>Developer</p>

            <p className={css.highlight}>Yevhenii Oliinyk</p>
          </div>

          <div className={css.block}>
            <p className={css.label}>Contact</p>

            <a
              href="mailto:sportpit2020@gmail.com"
              className={css.email}
            >
              sportpit2020@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}