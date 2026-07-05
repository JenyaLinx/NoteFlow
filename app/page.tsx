import css from "./Home.module.css";

export default function Home() {
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to Note Flow</h1>
        <p className={css.description}>
          Note Flow is a simple and efficient application designed for managing
          personal notes.
        </p>
        <p className={css.description}>
          The app provides a clean interface for writing, editing, and browsing notes.
        </p>
      </div>
    </main>
  );
}