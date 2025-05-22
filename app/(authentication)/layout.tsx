export default function AuthenticationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#f3f3f9', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
