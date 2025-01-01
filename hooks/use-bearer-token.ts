import { useCookies } from 'react-cookie';

export function useBearerToken() {
  const [cookies] = useCookies(['bearerToken']);
  return cookies.bearerToken || ''; / 
}