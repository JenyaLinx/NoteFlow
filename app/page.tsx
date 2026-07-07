import css from './Home.module.css';

export default function Home() {
  return (
    <main className={css.main}>
      <p className={css.badge}>Personal workspace</p>

      <h1 className={css.title}>Welcome to Note Flow</h1>

      <p className={css.description}>
        Note Flow is a simple and efficient application designed for managing
        personal notes.
      </p>

      <p className={css.description}>
        Organize your thoughts, tasks and ideas in one beautiful modern
        workspace.
      </p>
    </main>
  );
}