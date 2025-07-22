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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlassCard from '../components/GlassCard';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive dimensions
const getResponsiveDimensions = () => {
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

const AuthScreen = ({ navigation }) => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });
  
  const anim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const dimensions = getResponsiveDimensions();

  // Optimized animation
  const switchMode = (nextMode) => {
    if (mode === nextMode) return;
    
    Animated.timing(anim, {
      toValue: nextMode === 'login' ? 0 : 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    setMode(nextMode);
  };

  // Form handlers
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Animation interpolations
  const loginOpacity = anim.interpolate({ 
    inputRange: [0, 1], 
    outputRange: [1, 0] 
  });
  const signupOpacity = anim.interpolate({ 
    inputRange: [0, 1], 
    outputRange: [0, 1] 
  });

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Back Button - Absolute positioned in top-left corner */}
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
            {/* Header Section */}
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

            {/* Spacer for flexible layout */}
            <View style={styles.spacer} />

            {/* Form Card */}
            <GlassCard style={styles.formCard}>
              <View style={[
                styles.formContent,
                { padding: dimensions.cardPadding }
              ]}>
                {/* Mode Toggle */}
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      mode === 'login' && styles.toggleButtonActive
                    ]}
                    activeOpacity={0.8}
                    onPress={() => switchMode('login')}
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
                    onPress={() => switchMode('signup')}
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

                {/* Animated Forms Container */}
                <View style={styles.formsContainer}>
                  {/* Login Form */}
                  <Animated.View style={[
                    styles.formWrapper,
                    {
                      opacity: loginOpacity,
                      position: mode === 'login' ? 'relative' : 'absolute',
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
                    
                    <View style={styles.loginOptionsRow}>
                      <TouchableOpacity 
                        style={styles.rememberMeContainer}
                        onPress={() => updateFormData('rememberMe', !formData.rememberMe)}
                      >
                        <View style={[
                          styles.checkbox,
                          formData.rememberMe && styles.checkboxActive
                        ]}>
                          {formData.rememberMe && (
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

                    <ActionButton
                      title="Login"
                      onPress={() => {}}
                      fontSize={dimensions.buttonFontSize}
                    />
                    
                    <SocialLoginSection fontSize={dimensions.inputFontSize} />
                  </Animated.View>

                  {/* Signup Form */}
                  <Animated.View style={[
                    styles.formWrapper,
                    {
                      opacity: signupOpacity,
                      position: mode === 'signup' ? 'relative' : 'absolute',
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
                      onPress={() => {}}
                      fontSize={dimensions.buttonFontSize}
                    />
                    
                    <SocialLoginSection 
                      mode="signup" 
                      fontSize={dimensions.inputFontSize}
                    />
                    
                    <TouchableOpacity 
                      style={styles.switchModeContainer}
                      onPress={() => switchMode('login')}
                    >
                      <Text style={styles.switchModeText}>
                        Already have an account?{' '}
                        <Text style={styles.switchModeLink}>Login</Text>
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              </View>
            </GlassCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ScreenWrapper>
  );
};

// Optimized reusable components
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

const SocialLoginSection = ({ mode = 'login', fontSize = 15 }) => (
  <>
    <Text style={[styles.orText, { fontSize: fontSize - 1 }]}>
      Or {mode === 'login' ? 'login' : 'sign up'} with
    </Text>
    <View style={styles.socialButtonsContainer}>
      <SocialButton
        icon="logo-google"
        title="Google"
        onPress={() => {}}
        fontSize={fontSize}
      />
      <SocialButton
        icon="logo-apple"
        title="Apple"
        onPress={() => {}}
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