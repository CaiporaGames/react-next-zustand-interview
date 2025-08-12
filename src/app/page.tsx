import styles from "./page.module.css";
//import Page from "./challenges/1-use-effect-deps/page.jsx";
//import Page from "./challenges/2-use-ref-controlled/page.jsx";
import Page from "./challenges/3-zustand-slices/page.jsx";
//import Page from "./challenges/4-zustand-immutable/page.jsx";

export default function Home() {
  return (
    <div className={styles.container}>
      <Page />
      </div>
  );
}
