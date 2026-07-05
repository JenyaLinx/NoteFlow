import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} Note Flow. All rights reserved.</p>

        <div className={css.wrap}>
          <p>Developer: Yevhenii Oliinyk</p>
          <p>
            Contact us:
            <a href="mailto:student@notehub.app">sportpit2020@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}