import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import storageService from '../services/storageService';

import logo from '../../assets/image/logo.png';
import forma from '../../assets/image/forma.png';
import health from '../../assets/image/health.png';
import rewards from '../../assets/image/rewards.png';
import wellness from '../../assets/image/wellness.png';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const slides = [
    {
        id: 1,
        image: logo,
        title: 'FORMA',
        subtitle: '',
        description: '',
    },
    {
        id: 2,
        image: forma,
        title: 'Welcome to FORMA',
        subtitle: 'Build habits with intention.',
        description: 'FORMA helps you shape mindful habits at your own pace. A calm, minimalist space designed to turn small daily actions into lasting change.'
    },
    {
        id: 3,
        image: health,
        title: 'Your Daily Practice',
        subtitle: 'Consistency over perfection.',
        description: 'Create and follow habits with simplicity. FORMA focuses on steady progress, helping you stay present and build routines that last.'
    },
    {
        id: 4,
        image: wellness,
        title: 'See Your Progress',
        subtitle: 'Awareness creates change.',
        description: 'Gentle insights help you understand your habits over time. Observe patterns, reflect calmly, and adjust with intention.'
    },
    {
        id: 5,
        image: rewards,
        title: 'Stay Consistent',
        subtitle: 'Progress feels better when it’s calm.',
        description: 'FORMA encourages gentle motivation. Celebrate your commitment, build meaningful streaks, and enjoy the process — without pressure.'
    }
]

export default function OnboardingScreen({ navigation }) {

    const [ currentIndex, setCurrentIndex ] = useState(0);
    const scrollViewRef = useRef(null);

    const handleScroll = (event) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
        setCurrentIndex(slideIndex);
    };

    const goToSlide = (index) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        scrollViewRef.current?.scrollTo({
            x: index * SCREEN_WIDTH,
            animated: true
        });
        setCurrentIndex(index);
    };

    const handleNext = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (currentIndex < slides.length - 1) {
            goToSlide(currentIndex + 1);
        } else {
            handleGetStarted();
        }
    };

    const handleGetStarted = async () => {};

    const PrimaryButton = ({ onPress, text, variant = 'next' }) => (
        <Pressable
            onPress={ onPress }
            style={({ pressed }) => [
                styles.primaryButton,
                variant === 'next' ? styles.nextButton : styles.getStartedButton,
                pressed && styles.buttonPressed
            ]}
        >
            <Text style={ variant === 'next' ? styles.nextButtonText : styles.getStartedButtonText }>{ text }</Text>
            <Ionicons name='arrow-forward' size={ 20 } color={ COLORS.dark } style={ styles.buttonIcon } />
        </Pressable>
    );

    return (
        <View style={ styles.container }>
            <ScrollView
                ref={ scrollViewRef }
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={ false }
                onMomentumScrollEnd={ handleScroll }
                style={ styles.scrollView }
            >
                {
                    slides.map((slide, index) => (
                        <View key={ slide.id } style={ styles.slide }>
                            <View style={ styles.slideContent }>
                                <View style={ styles.imageContainer }>
                                    <Image
                                        source={ slide.image }
                                        style={ styles.illustration }
                                        resizeMode='contain'
                                    />
                                </View>

                                <View style={ styles.textContainer }>
                                    <Text style={ styles.title }>{ slide.title }</Text>
                                    <Text style={ styles.subtitle }>{ slide.subtitle }</Text>
                                </View>
                                <Text style={ styles.description }>{ slide.description }</Text>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>

            <View style={ styles.pagination }>
                {
                    slides.map((_, index) => (
                        <Pressable
                            key={ index }
                            onPress={ () => goToSlide(index) }
                            style={({ pressed }) => [
                                styles.dot,
                                currentIndex === index && styles.dotActive,
                                pressed && { opacity: 0.6 }
                            ]}
                        />
                    ))
                }
            </View>

            <View style={ styles.actions }>
                {
                    currentIndex < slides.length - 1 ? (
                        <PrimaryButton onPress={ handleNext } text='Next' variant='next' />
                    ) : (
                        <PrimaryButton onPress={ handleGetStarted } text='Get started' variant='start' />
                    )
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    scrollView: { flex: 1 },
    slide: {
        width: SCREEN_WIDTH,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 100,
        paddingBottom: 24
    },
    slideContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%'
    },
    imageContainer: {
        width: '100%',
        height: Math.min(SCREEN_HEIGHT * 0.35, 280),
        marginBottom: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    illustration: {
        width: '100%',
        height: '100%',
        maxWidth: 300,
        maxHeight: 300,
        opacity: 0.95
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 24
    },
    title: {
        ...TYPOGRAPHY.HEADING_1,
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: 16,
        letterSpacing: -0.5
    },
    subtitle: {
        ...TYPOGRAPHY.BODY_SMALL,
        color: COLORS.primary,
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 0.3
    },
    description: {
        ...TYPOGRAPHY.BODY_SMALL,
        color: COLORS.textTertiary,
        textAlign: 'center',
        paddingHorizontal: 32,
        marginTop: 14,
        lineHeight: 22,
        letterSpacing: 0.2
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        marginBottom: 16,
        gap: 8
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.surfaceSecondary,
        borderWidth: 1,
        borderColor: COLORS.border
    },
    dotActive: {
        width: 32,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
        borderWidth: 0
    },
    actions: {
        paddingHorizontal: 24,
        paddingBottom: 60,
        alignItems: 'center'
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 18,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border
    },
    nextButton: {
        paddingHorizontal: 40,
        minWidth: 140
    },
    getStartedButton: {
        paddingHorizontal: 48,
        minWidth: 220
    },
    buttonPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.97 }]
    },
    nextButtonText: {
        ...TYPOGRAPHY.BODY,
        fontWeight: '600',
        color: COLORS.dark,
        letterSpacing: 0.3
    },
    getStartedButtonText: {
        ...TYPOGRAPHY.HEADING_4,
        fontWeight: '700',
        color: COLORS.dark,
        letterSpacing: -0.3
    },
    buttonIcon: { marginLeft: 12 }
});