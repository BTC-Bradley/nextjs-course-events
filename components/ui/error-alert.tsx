import classes from "./error-alert.module.css";

interface IErrorAlertProps {
  children: React.ReactNode;
}

function ErrorAlert(props: IErrorAlertProps) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
