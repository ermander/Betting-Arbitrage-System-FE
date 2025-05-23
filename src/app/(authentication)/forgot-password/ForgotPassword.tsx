'use client';

import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Auth.module.css';
import emailSendAnimation from "@/public/email-send-animation.gif";

export default function ForgotPassword() {
  const onFinish = () => {
    // handle submit
  };

  return (
    <div className={styles.authBg}>
      <div className={styles.authCard}>
        <h2 className={styles.welcome} style={{ marginBottom: 8, color: '#405189' }}>Password dimenticata?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <Image
            src={emailSendAnimation}
            alt="Email send animation"
            width={120}
            height={120}
            style={{ objectFit: 'contain', }}
            unoptimized={true}
            color='#0ab39c'
          

          />
        </div>
        <Alert
          message="Inserisci la tua email e ti invieremo le istruzioni!"
          type="warning"
          showIcon={false}
          style={{ marginBottom: 18, background: '#fff7e6', border: 'none', color: '#b26a00', textAlign: 'center' }}
        />
        <Form layout="vertical" onFinish={onFinish} className={styles.form}>
          <Form.Item label={<span className={styles.formLabel}>Email</span>} name="email" className={styles.formItem} rules={[{ required: true, message: 'Inserisci la tua email!' }]}> 
            <Input placeholder="Inserisci la tua email" size="large" className={styles.input} />
          </Form.Item>
          <Form.Item style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" block size="large" className={styles.loginButton}>
              Invia link di reset
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ textAlign: 'center', marginTop: 24, fontSize: 15, color: '#212529' }}>
        Aspetta, mi sono ricordato la password...{' '}
        <Link href="/signin" className={styles.signupLink}>Clicca qui</Link>
      </div>
    </div>
  );
} 