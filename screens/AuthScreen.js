import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../components/GlassCard';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DM_SANS = Platform.select({ ios: 'DM Sans', android: 'DM Sans', default: 'sans-serif' });

const AuthScreen = ({ navigation }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const anim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  // Animate toggle
  const switchMode = (nextMode) => {
    if (mode === nextMode) return;
    Animated.timing(anim, {
      toValue: nextMode === 'login' ? 0 : 1,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    setMode(nextMode);
  };

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [remember, setRemember] = useState(false);

  // Interpolations for smooth transition
  const loginOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const signupOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <ScreenWrapper>
      <BackButton />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 0 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.headerWrap, { marginTop: insets.top + 65 }]}> {/* 44 = BackButton size + gap */}
            <Text style={styles.header}>Go ahead and set up you account</Text>
            <Text style={styles.subheader}>Sign in – up to enjoy the best music experience</Text>
          </View>
          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: 'flex-end' }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <GlassCard style={styles.card}>
                {/* Toggle */}
                <View style={styles.toggleRow}>
                  <TouchableOpacity
                    style={[styles.toggleBtn, mode === 'login' && styles.toggleBtnActive]}
                    activeOpacity={0.85}
                    onPress={() => switchMode('login')}
                  >
                    <Text style={[styles.toggleText, mode === 'login' && styles.toggleTextActive]}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.toggleBtn, mode === 'signup' && styles.toggleBtnActive]}
                    activeOpacity={0.85}
                    onPress={() => switchMode('signup')}
                  >
                    <Text style={[styles.toggleText, mode === 'signup' && styles.toggleTextActive]}>Sign up</Text>
                  </TouchableOpacity>
                </View>
                {/* Animated Forms */}
                <View style={{ minHeight: 260 }}>
                  {/* Login Form */}
                  <Animated.View style={[styles.formWrap, { opacity: loginOpacity, position: mode === 'login' ? 'relative' : 'absolute', width: '100%' }]}>  
                    <AuthInput
                      icon="mail-outline"
                      placeholder="Email address"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    <AuthInput
                      icon="lock-closed-outline"
                      placeholder="Password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                    <View style={styles.rowBetween}>
                      <TouchableOpacity style={styles.row} onPress={() => setRemember(!remember)}>
                        <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
                          {remember && <Ionicons name="checkmark" size={16} color="#fff" />}
                        </View>
                        <Text style={styles.rememberText}>Remember me</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.mainBtn} activeOpacity={0.85}>
                      <Text style={styles.mainBtnText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.orText}>Or login with</Text>
                    <View style={styles.socialRow}>
                      <SocialBtn icon="logo-google" label="Google" onPress={() => {}} />
                      <SocialBtn icon="logo-apple" label="Apple" onPress={() => {}} />
                    </View>
                  </Animated.View>
                  {/* Sign Up Form */}
                  <Animated.View style={[styles.formWrap, { opacity: signupOpacity, position: mode === 'signup' ? 'relative' : 'absolute', width: '100%' }]}>  
                    <AuthInput
                      icon="mail-outline"
                      placeholder="Email address"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    <AuthInput
                      icon="lock-closed-outline"
                      placeholder="Password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                    <AuthInput
                      icon="lock-closed-outline"
                      placeholder="Confirm Password"
                      value={confirm}
                      onChangeText={setConfirm}
                      secureTextEntry
                    />
                    <TouchableOpacity style={styles.mainBtn} activeOpacity={0.85}>
                      <Text style={styles.mainBtnText}>Sign up</Text>
                    </TouchableOpacity>
                    <Text style={styles.orText}>Or sign up with</Text>
                    <View style={styles.socialRow}>
                      <SocialBtn icon="logo-google" label="Google" onPress={() => {}} />
                      <SocialBtn icon="logo-apple" label="Apple" onPress={() => {}} />
                    </View>
                    <TouchableOpacity style={{ alignSelf: 'center', marginTop: 18 }} onPress={() => switchMode('login')}>
                      <Text style={styles.loginLink}>Already have an account? <Text style={{ textDecorationLine: 'underline', color: '#fff' }}>Login</Text></Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              </GlassCard>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

// AuthInput: modular, scalable input with icon
const AuthInput = ({ icon, ...props }) => (
  <View style={styles.inputWrap}>
    <Ionicons name={icon} size={20} color="rgba(255,255,255,0.7)" style={{ marginRight: 10 }} />
    <TextInput
      style={styles.input}
      placeholderTextColor="rgba(255,255,255,0.45)"
      {...props}
    />
  </View>
);

// SocialBtn: modular, scalable social button
const SocialBtn = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.socialBtn} activeOpacity={0.85} onPress={onPress}>
    <Ionicons name={icon} size={20} color="#fff" style={{ marginRight: 8 }} />
    <Text style={styles.socialBtnText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  headerWrap: {
    marginBottom: 18,
    paddingHorizontal: 28,
  },
  header: {
    fontFamily: DM_SANS,
    fontWeight: '600',
    fontSize: 24,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 24,
    letterSpacing: 0,
    marginBottom: 8,
  },
  subheader: {
    fontFamily: DM_SANS,
    fontWeight: '400',
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 16,
    letterSpacing: 0,
  },
  card: {
    width: '100%',
    marginBottom: 0,
    paddingVertical: 24,
    paddingHorizontal: 0,
    borderRadius: 0,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 22,
    marginBottom: 22,
    marginHorizontal: 10,
    padding: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.13)',
  },
  toggleText: {
    fontFamily: DM_SANS,
    fontWeight: '600',
    fontSize: 17,
    color: 'rgba(255,255,255,0.7)',
  },
  toggleTextActive: {
    color: '#fff',
  },
  formWrap: {
    width: '100%',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.18)',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontFamily: DM_SANS,
    fontWeight: '400',
    fontSize: 15,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginHorizontal: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderColor: '#fff',
  },
  rememberText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: DM_SANS,
    fontWeight: '400',
  },
  forgotText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: DM_SANS,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  mainBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 8,
    marginBottom: 8,
  },
  mainBtnText: {
    color: '#fff',
    fontFamily: DM_SANS,
    fontWeight: '600',
    fontSize: 17,
  },
  orText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: DM_SANS,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 8,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 2,
    gap: 12,
    marginHorizontal: 2,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingVertical: 10,
    marginHorizontal: 4,
  },
  socialBtnText: {
    color: '#fff',
    fontFamily: DM_SANS,
    fontWeight: '600',
    fontSize: 15,
  },
  loginLink: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: DM_SANS,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 2,
  },
});

export default AuthScreen; 