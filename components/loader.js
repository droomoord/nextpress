import classes from "../styles/loader.module.scss";

const Loader = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.loader}>
        <span>=</span>
        <span>=</span>
        <span>=</span>
        <span>=</span>
      </div>
    </div>
  );
};

export default Loader;
