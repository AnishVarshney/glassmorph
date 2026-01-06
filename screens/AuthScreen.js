import React from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlassCard from '../components/GlassCard';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Custom hook for responsive dimensions
const useResponsiveDimensions = () => {
  const isSmallScreen = SCREEN_WIDTH < 375;
  const isMediumScreen = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
  const isLargeScreen = SCREEN_WIDTH >= 414;

  return {
    horizontalPadding: isSmallScreen ? 20 : isMediumScreen ? 24 : 28,
    headerFontSize: isSmallScreen ? 22 : isMediumScreen ? 24 : 26,
    subHeaderFontSize: isSmallScreen ? 14 : 16,
    inputFontSize: isSmallScreen ? 14 : 15,
    buttonFontSize: isSmallScreen ? 15 : 17,
    cardPadding: isSmallScreen ? 20 : 24,
    backButtonSize: isSmallScreen ? 36 : 40,
  };
};

// Custom hook for authentication form state and logic
const useAuthForm = () => {
  const [mode, setMode] = React.useState('login');
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return { isValid: false, error: 'Please fill in all required fields' };
    }
    
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      return { isValid: false, error: 'Passwords do not match' };
    }
    
    return { isValid: true };
  };

  return {
    mode,
    setMode,
    formData,
    updateFormData,
    resetForm,
    validateForm,
  };
};

// Custom hook for animation logic
const useAuthAnimation = () => {
  const anim = React.useRef(new Animated.Value(0)).current;

  const switchMode = (nextMode, currentMode) => {
    if (currentMode === nextMode) return;
    
    Animated.timing(anim, {
      toValue: nextMode === 'login' ? 0 : 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const loginOpacity = anim.interpolate({ 
    inputRange: [0, 1], 
    outputRange: [1, 0] 
  });
  
  const signupOpacity = anim.interpolate({ 
    inputRange: [0, 1], 
    outputRange: [0, 1] 
  });

  return {
    switchMode,
    loginOpacity,
    signupOpacity,
  };
};

// Authentication service interface (following DIP)
class AuthService {
  async loginWithEmail(email, password) {
    // TODO: Implement email login
    console.log('Login with email:', email, password);
  }

  async signupWithEmail(email, password) {
    // TODO: Implement email signup
    console.log('Signup with email:', email, password);
  }

  async loginWithGoogle() {
    // TODO: Implement Google login
    console.log('Login with Google');
  }

  async loginWithApple() {
    // TODO: Implement Apple login
    console.log('Login with Apple');
  }
}

// Main AuthScreen component (now focused only on UI orchestration)
const AuthScreen = ({ navigation }) => {
  const dimensions = useResponsiveDimensions();
  const { mode, setMode, formData, updateFormData, validateForm } = useAuthForm();
  const { switchMode, loginOpacity, signupOpacity } = useAuthAnimation();
  const insets = useSafeAreaInsets();
  const authService = React.useMemo(() => new AuthService(), []);

  const handleModeSwitch = (nextMode) => {
    switchMode(nextMode, mode);
    setMode(nextMode);
  };

  const handleSubmit = async () => {
    const validation = validateForm();
    if (!validation.isValid) {
      // TODO: Show error message
      console.log('Validation error:', validation.error);
      return;
    }

    try {
      if (mode === 'login') {
        await authService.loginWithEmail(formData.email, formData.password);
      } else {
        await authService.signupWithEmail(formData.email, formData.password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      if (provider === 'google') {
        await authService.loginWithGoogle();
      } else if (provider === 'apple') {
        await authService.loginWithApple();
      }
    } catch (error) {
      console.error('Social login error:', error);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton
          absolute
          top={insets.top + 16}
          left={20}
          size={dimensions.backButtonSize}
        />

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <AuthHeader 
              insets={insets} 
              dimensions={dimensions} 
            />

            <View style={styles.spacer} />

            <GlassCard style={styles.formCard}>
              <View style={[
                styles.formContent,
                { padding: dimensions.cardPadding }
              ]}>
                <ModeToggle 
                  mode={mode}
                  onModeSwitch={handleModeSwitch}
                  dimensions={dimensions}
                />

                <View style={styles.formsContainer}>
                  <LoginForm
                    formData={formData}
                    updateFormData={updateFormData}
                    onSubmit={handleSubmit}
                    onSocialLogin={handleSocialLogin}
                    opacity={loginOpacity}
                    isVisible={mode === 'login'}
                    dimensions={dimensions}
                  />
                  
                  <SignupForm
                    formData={formData}
                    updateFormData={updateFormData}
                    onSubmit={handleSubmit}
                    onSocialLogin={handleSocialLogin}
                    onSwitchToLogin={() => handleModeSwitch('login')}
                    opacity={signupOpacity}
                    isVisible={mode === 'signup'}
                    dimensions={dimensions}
                  />
                </View>
              </View>
            </GlassCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ScreenWrapper>
  );
};

// Header component
const AuthHeader = ({ insets, dimensions }) => (
  <View style={[
    styles.headerSection,
    {
      paddingTop: insets.top + dimensions.backButtonSize + 32,
      paddingHorizontal: dimensions.horizontalPadding,
    }
  ]}>
    <Text style={[
      styles.headerTitle,
      { fontSize: dimensions.headerFontSize }
    ]}>
      Go ahead and set up you account
    </Text>
    <Text style={[
      styles.headerSubtitle,
      { fontSize: dimensions.subHeaderFontSize }
    ]}>
      Sign in – up to enjoy the best music experience
    </Text>
  </View>
);

// Mode toggle component
const ModeToggle = ({ mode, onModeSwitch, dimensions }) => (
  <View style={styles.toggleContainer}>
    <TouchableOpacity
      style={[
        styles.toggleButton,
        mode === 'login' && styles.toggleButtonActive
      ]}
      activeOpacity={0.8}
      onPress={() => onModeSwitch('login')}
    >
      <Text style={[
        styles.toggleText,
        mode === 'login' && styles.toggleTextActive,
        { fontSize: dimensions.buttonFontSize }
      ]}>
        Login
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.toggleButton,
        mode === 'signup' && styles.toggleButtonActive
      ]}
      activeOpacity={0.8}
      onPress={() => onModeSwitch('signup')}
    >
      <Text style={[
        styles.toggleText,
        mode === 'signup' && styles.toggleTextActive,
        { fontSize: dimensions.buttonFontSize }
      ]}>
        Sign up
      </Text>
    </TouchableOpacity>
  </View>
);

// Login form component
const LoginForm = ({ formData, updateFormData, onSubmit, onSocialLogin, opacity, isVisible, dimensions }) => (
  <Animated.View style={[
    styles.formWrapper,
    {
      opacity,
      position: isVisible ? 'relative' : 'absolute',
    }
  ]}>
    <AuthInput
      icon="mail-outline"
      placeholder="Email address"
      value={formData.email}
      onChangeText={(value) => updateFormData('email', value)}
      keyboardType="email-address"
      autoCapitalize="none"
      fontSize={dimensions.inputFontSize}
    />
    <AuthInput
      icon="lock-closed-outline"
      placeholder="Password"
      value={formData.password}
      onChangeText={(value) => updateFormData('password', value)}
      secureTextEntry
      fontSize={dimensions.inputFontSize}
    />
    
    <LoginOptions 
      rememberMe={formData.rememberMe}
      onRememberMeChange={(value) => updateFormData('rememberMe', value)}
    />

    <ActionButton
      title="Login"
      onPress={onSubmit}
      fontSize={dimensions.buttonFontSize}
    />
    
    <SocialLoginSection 
      mode="login" 
      fontSize={dimensions.inputFontSize}
      onSocialLogin={onSocialLogin}
    />
  </Animated.View>
);

// Signup form component
const SignupForm = ({ formData, updateFormData, onSubmit, onSocialLogin, onSwitchToLogin, opacity, isVisible, dimensions }) => (
  <Animated.View style={[
    styles.formWrapper,
    {
      opacity,
      position: isVisible ? 'relative' : 'absolute',
    }
  ]}>
    <AuthInput
      icon="mail-outline"
      placeholder="Email address"
      value={formData.email}
      onChangeText={(value) => updateFormData('email', value)}
      keyboardType="email-address"
      autoCapitalize="none"
      fontSize={dimensions.inputFontSize}
    />
    <AuthInput
      icon="lock-closed-outline"
      placeholder="Password"
      value={formData.password}
      onChangeText={(value) => updateFormData('password', value)}
      secureTextEntry
      fontSize={dimensions.inputFontSize}
    />
    <AuthInput
      icon="lock-closed-outline"
      placeholder="Confirm Password"
      value={formData.confirmPassword}
      onChangeText={(value) => updateFormData('confirmPassword', value)}
      secureTextEntry
      fontSize={dimensions.inputFontSize}
    />

    <ActionButton
      title="Sign up"
      onPress={onSubmit}
      fontSize={dimensions.buttonFontSize}
    />
    
    <SocialLoginSection 
      mode="signup" 
      fontSize={dimensions.inputFontSize}
      onSocialLogin={onSocialLogin}
    />
    
    <TouchableOpacity 
      style={styles.switchModeContainer}
      onPress={onSwitchToLogin}
    >
      <Text style={styles.switchModeText}>
        Already have an account?{' '}
        <Text style={styles.switchModeLink}>Login</Text>
      </Text>
    </TouchableOpacity>
  </Animated.View>
);

// Login options component
const LoginOptions = ({ rememberMe, onRememberMeChange }) => (
  <View style={styles.loginOptionsRow}>
    <TouchableOpacity 
      style={styles.rememberMeContainer}
      onPress={() => onRememberMeChange(!rememberMe)}
    >
      <View style={[
        styles.checkbox,
        rememberMe && styles.checkboxActive
      ]}>
        {rememberMe && (
          <Ionicons name="checkmark" size={14} color="#fff" />
        )}
      </View>
      <Text style={styles.rememberMeText}>Remember me</Text>
    </TouchableOpacity>
    
    <TouchableOpacity>
      <Text style={styles.forgotPasswordText}>
        Forgot password?
      </Text>
    </TouchableOpacity>
  </View>
);

// Reusable components
const AuthInput = ({ icon, fontSize = 15, ...props }) => (
  <View style={styles.inputContainer}>
    <Ionicons 
      name={icon} 
      size={20} 
      color="rgba(255,255,255,0.7)" 
      style={styles.inputIcon} 
    />
    <TextInput
      style={[styles.textInput, { fontSize }]}
      placeholderTextColor="rgba(255,255,255,0.5)"
      {...props}
    />
  </View>
);

const ActionButton = ({ title, onPress, fontSize = 17 }) => (
  <TouchableOpacity 
    style={styles.actionButton} 
    activeOpacity={0.8} 
    onPress={onPress}
  >
    <Text style={[styles.actionButtonText, { fontSize }]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const SocialButton = ({ icon, title, onPress, fontSize = 15 }) => (
  <TouchableOpacity 
    style={styles.socialButton} 
    activeOpacity={0.8} 
    onPress={onPress}
  >
    <Ionicons name={icon} size={20} color="#fff" style={styles.socialIcon} />
    <Text style={[styles.socialButtonText, { fontSize }]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const SocialLoginSection = ({ mode = 'login', fontSize = 15, onSocialLogin }) => (
  <>
    <Text style={[styles.orText, { fontSize: fontSize - 1 }]}>
      Or {mode === 'login' ? 'login' : 'sign up'} with
    </Text>
    <View style={styles.socialButtonsContainer}>
      <SocialButton
        icon="logo-google"
        title="Google"
        onPress={() => onSocialLogin('google')}
        fontSize={fontSize}
      />
      <SocialButton
        icon="logo-apple"
        title="Apple"
        onPress={() => onSocialLogin('apple')}
        fontSize={fontSize}
      />
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerSection: {
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 32,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontWeight: '400',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 22,
  },
  spacer: {
    flex: 1,
    minHeight: 40,
  },
  formCard: {
    borderRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginHorizontal: 0,
  },
  formContent: {
    minHeight: 400,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  toggleText: {
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },
  toggleTextActive: {
    color: '#fff',
  },
  formsContainer: {
    minHeight: 320,
  },
  formWrapper: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    color: '#fff',
    fontWeight: '400',
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  loginOptionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.6)',
  },
  rememberMeText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '400',
  },
  forgotPasswordText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  orText: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 12,
  },
  socialIcon: {
    marginRight: 8,
  },
  socialButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  switchModeContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  switchModeText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '400',
  },
  switchModeLink: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default AuthScreen;