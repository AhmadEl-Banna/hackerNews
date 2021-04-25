import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import StoriesList from '../components/StoriesList';
import Colors from '../constants/Colors';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import useColorScheme from '../hooks/useColorScheme';
import { fetchTopStories, topStoriesSelectors } from '../store/hackerNewsStoriesSlice';

const TopStories: React.FC = () => {
  const dispatch = useAppDispatch();
  const storiesIds = useAppSelector(topStoriesSelectors.selectTopStoriesIds)
  const [isLoading, setIsLoading] = useState(true); 
  const navigation = useNavigation();
  navigation.setOptions({
    title: 'Top 10 stories'
  })

  useEffect(() => { 
    dispatch(fetchTopStories()).finally(() => setIsLoading(false));
  }, []);

  const refresh = useCallback(() => {
    dispatch(fetchTopStories()).finally(() => setIsLoading(false));
  }, []);
  
  return (<View style={styles.container}>
    {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> :
      <StoriesList stories={storiesIds} onRefresh={refresh} refreshing={ isLoading}/>}
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default TopStories;