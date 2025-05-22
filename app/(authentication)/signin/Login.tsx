'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Checkbox } from 'antd';
import Link from 'next/link';
import styles from '../Auth.module.css';

export default function Login() {
  const router = useRouter();

  const onFinish = () => {
    router.push('/(dashboard)');
  };

  return (
    <div className={styles.authBg}>
      <div className={styles.authCard}>
        <h2 className={styles.welcome}>Bentornato!</h2>
        <Form layout="vertical" style={{ marginTop: 24 }} onFinish={onFinish} className={styles.form}>
          <Form.Item label={<span className={styles.formLabel}>Email</span>} name="email" className={styles.formItem}>
            <Input placeholder="Inserisci l'email" size="large" className={styles.input} />
          </Form.Item>
          <Form.Item label={<span className={styles.formLabel}>Password</span>} name="password" className={styles.formItem}>
            <Input.Password placeholder="Inserisci la password" size="large" className={styles.input} />
          </Form.Item>
          <div className={styles.authRow}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ricordami</Checkbox>
            </Form.Item>
            <Link className={styles.forgot} href="/forgot-password">Password dimenticata?</Link>
          </div>
          <Form.Item style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" block size="large" className={styles.loginButton}>
              Accedi
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.signupRow}>
          Non hai un account? <Link href="/signup" className={styles.signupLink}>Registrati</Link>
        </div>
      </div>
    </div>
  );
} 