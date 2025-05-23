'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button } from 'antd';
import styles from '../Auth.module.css';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();

  const onFinish = () => {
    // Redirect to dashboard or show a success message
    router.push('/(dashboard)');
  };

  return (
    <div className={styles.authBg}>
      <div className={styles.authCard}>
        <h2 className={styles.welcome}>Registrati</h2>
        <Form layout="vertical" style={{ marginTop: 24 }} onFinish={onFinish} className={styles.form}>
          <Form.Item label={<span className={styles.formLabel}>Email</span>} name="email" className={styles.formItem} rules={[{ required: true, message: 'Inserisci l\'email!' }]}> 
            <Input placeholder="Inserisci l'email" size="large" className={styles.input} />
          </Form.Item>
          <Form.Item label={<span className={styles.formLabel}>Password</span>} name="password" className={styles.formItem} rules={[{ required: true, message: 'Inserisci la password!' }]}> 
            <Input.Password placeholder="Inserisci la password" size="large" className={styles.input} />
          </Form.Item>
          <Form.Item label={<span className={styles.formLabel}>Conferma Password</span>} name="confirmPassword" className={styles.formItem} dependencies={["password"]} rules={[{ required: true, message: 'Conferma la password!' }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('password') === value) { return Promise.resolve(); } return Promise.reject(new Error('Le password non coincidono!')); } })]}> 
            <Input.Password placeholder="Conferma la password" size="large" className={styles.input} />
          </Form.Item>
          <Form.Item style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" block size="large" className={styles.loginButton}>
              Registrati
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.signupRow}>
          Hai già un account? <Link href="/signin" className={styles.signupLink}>Accedi</Link>
        </div>
      </div>
    </div>
  );
} 