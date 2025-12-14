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
        title: '',
        subtitle: '',
        description: '',
    },
    {
        id: 2,
        image: forma,
        title: 'Welcome to FORMA',
        subtitle: 'Build better habits, one day at a time.',
        description: 'The elegant habit tracker that helps you transform your daily routines into lasting positive changes. Minimalist design meets powerful insights.'
    },
    {
        id: 3,
        image: health,
        title: 'Track Your Journey',
        subtitle: 'Organize your habits effortlessly.',
        description: 'Create, manage, and complete your habits with intuitive gestures. Watch your consistency build into meaningful progress.'
    },
    {
        id: 4,
        image: wellness,
        title: 'Insights That Matter',
        subtitle: 'Visualize your growth.',
        description: 'Beautiful charts and statistics reveal what\'s working. Discover patterns, celebrate wins, and optimize your approach.'
    },
    {
        id: 5,
        image: rewards,
        title: 'Stay Motivated',
        subtitle: 'Unlock achievements and build streaks.',
        description: 'Transform habit-building into an exciting journey. Earn badges, maintain streaks, and watch your progress come to life.'
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
    container: {},
    scrollView: {},
    slide: {},
    slideContent: {},
    imageContainer: {},
    illustration: {},
    textContainer: {},
    title: {},
    subtitle: {},
    description: {},
    pagination: {},
    dot: {},
    dotActive: {},
    actions: {},
    primaryButton: {},
    nextButton: {},
    getStartedButton: {},
    buttonPressed: {},
    nextButtonText: {},
    getStartedButtonText: {},
    buttonIcon: {}
});