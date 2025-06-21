import { Redirect } from 'expo-router';
import { useAuthStore } from '@/state/authStore';
import { tokenStorage } from '@/state/storage';
import { useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Alert } from 'react-native';
import { refresh_token } from '@/services/apiInterceptors';
import { refetchUser } from '@/services/authService';
import * as SplashScreen from 'expo-splash-screen';

interface DecodedToken {
  exp: number;
}

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const { user, setUser } = useAuthStore();

  const validateAndRefreshTokens = useCallback(async () => {
    const accessToken = tokenStorage.getString('accessToken');
    const refreshToken = tokenStorage.getString('refreshToken');

    if (!accessToken || !refreshToken) {
      return false;
    }

    try {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken.exp < currentTime) {
        Alert.alert('Session expired', 'Please login again');
        tokenStorage.delete('accessToken');
        tokenStorage.delete('refreshToken');
        return false;
      }

      if (decodedAccessToken.exp < currentTime) {
        const newAccessToken = await refresh_token();
        if (!newAccessToken) {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }, []);

  const initializeAuth = useCallback(async () => {
    try {
      const isValid = await validateAndRefreshTokens();
      
      if (isValid && !user?.role) {
        await refetchUser(setUser);
      }

      setIsReady(true);
      await SplashScreen.hideAsync();
    } catch (error) {
      console.error('Auth initialization error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      setIsReady(true);
    }
  }, [validateAndRefreshTokens, user?.role, setUser]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (!isReady) {
    return null;
  }

  // Get fresh token values after validation
  const accessToken = tokenStorage.getString('accessToken');
  const refreshToken = tokenStorage.getString('refreshToken');

  // If not authenticated, redirect to login
  if (!accessToken || !refreshToken) {
    console.log('No access or refresh token found, redirecting to login');
    return <Redirect href="/CustomerLogin" />;
  }

  // If authenticated but no user data, redirect to login
  if (!user) {
    console.log('No user data found, redirecting to login');
    return <Redirect href="/CustomerLogin" />;
  }

  // Route based on user role
  switch (user.role) {
    case 'Customer':
      return <Redirect href="/ProductDashboard" />;
    case 'DeliveryPartner':
      return <Redirect href="/DeliveryDashboard" />;
    default:
      // Unknown role - clear tokens and redirect to login
      tokenStorage.delete('accessToken');
      tokenStorage.delete('refreshToken');
      return <Redirect href="/CustomerLogin" />;
  }
} 