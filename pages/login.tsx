import React, { useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Login.module.scss";

// Components
import { notification, Button } from "antd";
import type { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];

// Api
import signin from "./api/authentication";

// Context
const Context = React.createContext({ name: "Default" });

const Login: NextPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openNotification = (
    type: "success" | "info" | "warning" | "error",
    placement: NotificationPlacement,
    title: string,
    message: string,
    style: React.CSSProperties = {}
  ) => {
    api[type]({
      message: title,
      description: message,
      placement,
      style,
    });
  };

  const contextValue = React.useMemo(() => ({ name: "Ant Design" }), []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await signin({ email, password });
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      openNotification("error", "topRight", "Errore", "Credenziali non valide");
    }
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className={styles.login}>
        <div className={styles.left}>
          <h1 className={styles.title}>Matched Betting</h1>
          <h1 className={styles.title}>Managment System</h1>
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>Login</h1>
          <h2 className={styles.subtitle}>
            Accedi al tuo account per usare il gestionale
          </h2>
          <div className={styles.form}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="Inserisci la tua email..."
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Inserisci la tua password..."
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className={styles.loginButton}
              onClick={handleLogin}
              loading={isLoading}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </Context.Provider>
  );
};

export default Login;
