import classes from "../styles/HomeLayout.module.scss";

const HomeLayout = ({ page }) => {
  return (
    <div>
      <div className={`${classes.logo} `}>
        <div className={classes.takraf}>
          <div>
            <span className={classes.roll}>=</span>
          </div>
          <div>
            <span>=&nbsp;</span>
            <span>======de</span>
          </div>
          <h1>nijverheid</h1>
          <div>
            <span>==========</span>
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>
    </div>
  );
};

export default HomeLayout;
